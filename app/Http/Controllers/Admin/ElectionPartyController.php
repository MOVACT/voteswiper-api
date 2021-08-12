<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AttachOrSyncParty;
use App\Http\Requests\CreateOrEditQuestion;
use App\Http\Requests\StoreAnswers;
use App\Models\Election;
use App\Models\Party;
use App\Models\Question;
use App\Models\Upload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class ElectionPartyController extends Controller
{
    /**
     * List all parties for this election
     *
     * @param Election $election
     * @return Response
     */
    public function index(Election $election)
    {
        $parties = $election->parties()->with('logo')->get();
        $partiesArray = $parties->toArray();

        foreach($parties as $index => $party) {
            $answersCount = $party->pivot->answers()->count();
            $partiesArray[$index]['pivot']['answers_count'] = $answersCount;
        }

        return Inertia::render('elections/parties', [
            'election' => $election->withCount('questions')->find($election->id),
            'parties' => $partiesArray,
        ]);
    }

    /**
     * Show form for attaching party to election
     *
     * @param Election $election
     * @return RedirectResponse|Response
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function create(Election $election)
    {
        if (App::currentLocale() !== 'en') {
            return redirect()->route('admin.locale', [
                'key' => 'en',
                'redirect' => route('admin.election.parties.create')
            ]);
        }

        return Inertia::render('elections/parties/createOrEdit', [
            'election' => $election,
            'parties' => $election->country->parties()->orderBy('name')->get(['id', 'name'])
        ]);
    }

    /**
     * Store the new election
     *
     * @param CreateOrEditQuestion $request
     * @param Election $election
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function store(AttachOrSyncParty $request, Election $election) {
        $data = $request->input();

        if ($election->parties()->where('party_id', $data['party_id'])->first()) {
            return redirect()
                ->back()
                ->with(['error' => 'This party is already attached.']);
        }

        if ($request->file('program')) {
            $file = Upload::add($request->file('program'), 'programs');
            $data['program_upload_id'] = $file->id;
        }

        $election->parties()->attach($data['party_id'], $data);

        return redirect()
            ->route(
                'admin.election.parties',
                [
                    'election' => $election->id
                ]
            )
            ->with(['success' => 'The party was attached successfully.']);
    }

    /**
     * Show edit form
     *
     * @param Election $election
     * @param Party $question
     * @return Response
     */
    public function edit(Election $election, Party $party) {
        if (!$election->parties->contains($party->id)) {
            return redirect()->back()->with('error', __('This party is not attached to this election. Create it first.'));
        }

        return Inertia::render('elections/parties/createOrEdit', [
            'election' => $election,
            'party' => $party,
            'pivot' => $election->parties->find($party->id)->pivot,
            // Overwrite locales so that you can only switch between the ones available
            'locales' => $election->translations_available
        ]);
    }

    /**
     * Store the updated election
     *
     * @param AttachOrSyncParty $request
     * @param Election $election
     * @param Party $party
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function update(AttachOrSyncParty $request, Election $election, Party $party) {
        $data = $request->input();

        if (!$election->parties()->where('party_id', $data['party_id'])->first()) {
            return redirect()
                ->back()
                ->with(['error' => 'This party is not attached yet.']);
        }

        if ($request->file('program')) {
            $file = Upload::add($request->file('program'), 'programs');
            $data['program_upload_id'] = $file->id;
        }

        $election->parties()->updateExistingPivot($data['party_id'], $data);

        return redirect()
            ->route(
                'admin.election.parties.edit',
                [
                    'election' => $election->id,
                    'party' => $party->id,
                ]
            )
            ->with(['success' => 'The party was updated successfully.']);
    }

    /**
     * Edit answers
     *
     * @param Election $election
     * @param Party $party
     * @return Response
     */
    public function editAnswers(Election $election, Party $party) {
        // currently we don't support translated reasons
        if (App::currentLocale() !== 'en') {
            return redirect()->route('admin.locale', [
                'key' => 'en',
                'redirect' => route('admin.election.parties.answers', ['election' => $election->id, 'party' => $party->id])
            ]);
        }

        if (!$election->parties->contains($party->id)) {
            return redirect()->back()->with('error', __('This party is not attached to this election. Create it first.'));
        }

        $pivot = $election->parties->find($party->id)->pivot;

        // var_dump($pivot->answers()->get());//$election->parties->find($party->id)->pivot->with('answers')->first());

        return Inertia::render('elections/parties/editAnswers', [
            'election' => $election,
            'questions' => $election->questions()->ordered()->get(),
            'party' => $party,
            'pivot' => $pivot,
            'answers' => $pivot->answers()->get(),
            // Overwrite locales so that you can only switch between the ones available
            'locales' => $election->translations_available
        ]);
    }

    /**
     * Store the updated election
     *
     * @param StoreAnswers $request
     * @param Election $election
     * @param Party $party
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function storeAnswers(StoreAnswers $request, Election $election, Party $party) {
        // currently we don't support translated reasons
        if (App::currentLocale() !== 'en') {
            return redirect()->route('admin.locale', [
                'key' => 'en',
                'redirect' => route('admin.election.parties.answers', ['election' => $election->id, 'party' => $party->id])
            ]);
        }

        $data = $request->input();

        if (!$election->parties()->where('party_id', $party->id)->first()) {
            return redirect()
                ->back()
                ->with(['error' => 'This party is not attached yet.']);
        }

        $pivot = $election->parties->find($party->id)->pivot;

        /**
         * Loop over questions and check if the answer exists already, if not create
         */
        foreach($election->questions()->get() as $question) {
            $answer = $pivot->answers()->where('question_id', $question->id)->first();
            if ($answer) {
                $answer->update([
                    'answer' => $data['answer_' . $question->id],
                    'reason' => $data['reason_' . $question->id]
                ]);
            } else {
                $pivot->answers()->create([
                    'question_id' => $question->id,
                    'answer' => $data['answer_' . $question->id],
                    'reason' => $data['reason_' . $question->id]
                ]);
            }
        }

        return redirect()
            ->route(
                'admin.election.parties.answers',
                [
                    'election' => $election->id,
                    'party' => $party->id,
                ]
            )
            ->with(['success' => 'The answers were updated successfully.']);
    }
}
