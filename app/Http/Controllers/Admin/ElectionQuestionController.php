<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrEditQuestion;
use App\Models\Election;
use App\Models\Question;
use App\Models\Upload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class ElectionQuestionController extends Controller
{
    /**
     * List all questions for this election
     *
     * @param Election $election
     * @return Response
     */
    public function index(Election $election)
    {
        return Inertia::render('elections/questions', [
            'election' => $election->with(['questions' => function ($query) {
                $query->ordered();
            }])->find($election->id)
        ]);
    }

    /**
     * Show form for creating election
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
                'redirect' => route('admin.election.questions.create')
            ]);
        }

        return Inertia::render('elections/questions/createOrEdit', [
            'election' => $election
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
    public function store(CreateOrEditQuestion $request, Election $election) {
        $data = $request->input();

        $image = Upload::add($request->file('thumbnail'), 'thumbnails');
        $data['thumbnail_upload_id'] = $image->id;

        $election->questions()->create($data);

        return redirect()
            ->route(
                'admin.election.questions',
                [
                    'election' => $election->id
                ]
            )
            ->with(['success' => 'The question was created successfully.']);
    }

    /**
     * Show edit form
     *
     * @param Election $election
     * @param Question $question
     * @return Response
     */
    public function edit(Election $election, Question $question) {
        return Inertia::render('elections/questions/createOrEdit', [
            'election' => $election->with('card')->find($election->id),
            'question' => array_merge($question->with('thumbnail')->find($question->id)->toArray(), [
                'thesis' => $question->getTranslation('thesis', App::currentLocale(), false),
                'topic' => $question->getTranslation('topic', App::currentLocale(), false),
                'video_url' => $question->getTranslation('video_url', App::currentLocale(), false),
                'explainer_text' => $question->getTranslation('explainer_text', App::currentLocale(), false),
            ]),
            // Overwrite locales so that you can only switch between the ones available
            'locales' => $election->translations_available
        ]);
    }

    /**
     * Store the updated election
     *
     * @param CreateOrEditQuestion $request
     * @param Election $election
     * @param Question $question
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function update(CreateOrEditQuestion $request, Election $election, Question $question) {
        $data = $request->input();

        if ($request->file('thumbnail')) {
            $image = Upload::add($request->file('thumbnail'), 'thumbnails');
            $data['thumbnail_upload_id'] = $image->id;
        }

        $question->update($data);


        return redirect()
            ->route(
                'admin.election.questions.edit',
                [
                    'election' => $election->id,
                    'question' => $question->id,
                ]
            )
            ->with(['success' => 'The question was updated successfully.']);
    }

    /**
     * Moves a question up
     *
     * @param Election $election
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function moveUp(Election $election, Question $question) {
        $question->moveOrderUp();

        return redirect()
            ->route(
                'admin.election.questions',
                [
                    'election' => $election->id
                ]
            )
            ->with(['success' => 'The question sorting was updated successfully.']);
    }

    /**
     * Moves a question down
     *
     * @param Election $election
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function moveDown(Election $election, Question $question) {
        $question->moveOrderDown();

        return redirect()
            ->route(
                'admin.election.questions',
                [
                    'election' => $election->id
                ]
            )
            ->with(['success' => 'The question sorting was updated successfully.']);
    }
}
