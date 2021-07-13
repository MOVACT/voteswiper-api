<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrEditElection;
use App\Models\Country;
use App\Models\Election;
use App\Models\Upload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class ElectionController extends Controller
{
    /**
     * List all elections in the database
     *
     * @return Response
     */
    public function index()
    {
        $elections = Election::orderBy('voting_day', 'DESC')->with('country', 'card')->withCount(['questions', 'parties'])->get();

        return Inertia::render('elections', [
            'elections' => $elections
        ]);
    }

    /**
     * Show form for creating election
     *
     * @return RedirectResponse|Response
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function create()
    {
        if (App::currentLocale() !== 'en') {
            return redirect()->route('admin.locale', [
                'key' => 'en',
                'redirect' => route('admin.elections.create')
            ]);
        }

        $countries = Country::orderBy('name')->get(['id', 'name']);

        return Inertia::render('elections/createOrEdit', [
            'countries' => $countries
        ]);
    }

    /**
     * Store the new election
     *
     * @param CreateOrEditElection $request
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function store(CreateOrEditElection $request) {
        $data = $request->input();

        $image = Upload::add($request->file('card'), 'elections');
        $data['card_upload_id'] = $image->id;

        Election::create($data);

        return redirect()->route('admin.elections')->with(['success' => 'The election was created successfully.']);
    }

    /**
     * Show edit form
     *
     * @param Election $election
     * @return Response
     */
    public function edit(Election $election) {
        $countries = Country::orderBy('name')->get(['id', 'name']);
        return Inertia::render('elections/createOrEdit', [
            'election' => array_merge($election->with('card')->find($election->id)->toArray(), [
                'name' => $election->getTranslation('name', App::currentLocale(), false),
                'slug' => $election->getTranslation('slug', App::currentLocale(), false),
            ]),
            'countries' => $countries,
            // Overwrite locales so that you can only switch between the ones available
            'locales' => $election->translations_available
        ]);
    }

    /**
     * Store the updated election
     *
     * @param CreateOrEditElection $request
     * @param Election $election
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function update(CreateOrEditElection $request, Election $election) {
        $data = $request->input();

        if ($request->file('card')) {
            $image = Upload::add($request->file('card'), 'elections', $election->card_upload_id ?? null);
            // $data['card_upload_id'] = $image->id;
        }

        $election->update($data);

        return redirect()
            ->route(
                'admin.elections.edit',
                [
                    "election" => $election->id
                ]
            )
            ->with(['success' => 'Election updated successfully']);
    }
}
