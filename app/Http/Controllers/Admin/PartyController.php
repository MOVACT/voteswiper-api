<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrEditParty;
use App\Models\Country;
use App\Models\Party;
use App\Models\Upload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class PartyController extends Controller
{
    /**
     * List all parties in the database
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $parties = Party::orderBy('name')->with('country', 'logo');

        if ($request->get('country')) {
            $parties->where('country_id', $request->get('country'));
        }

        return Inertia::render('parties', [
            'parties' => $parties->get()
        ]);
    }

    /**
     * Show form for creating party
     *
     * @return RedirectResponse|Response
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function create()
    {
        $countries = Country::orderBy('name')->get(['id', 'name']);

        return Inertia::render('parties/createOrEdit', [
            'countries' => $countries
        ]);
    }

    /**
     * Store the new party
     *
     * @param CreateOrEditParty $request
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function store(CreateOrEditParty $request) {
        $data = $request->input();

        $image = Upload::add($request->file('logo'), 'parties');
        $data['logo_upload_id'] = $image->id;

        Party::create($data);

        return redirect()->route('admin.parties')->with(['success' => 'The parties was created successfully.']);
    }

    /**
     * Show edit party form
     *
     * @param Party $party
     * @return Response
     */
    public function edit(Party $party) {
        $countries = Country::orderBy('name')->get(['id', 'name']);
        return Inertia::render('parties/createOrEdit', [
            'party' => $party->with('logo')->find($party->id),
            'countries' => $countries
        ]);
    }

    /**
     * Store the updated party
     *
     * @param CreateOrEditParty $request
     * @param Party $party
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function update(CreateOrEditParty $request, Party $party) {
        $data = $request->input();

        if ($request->file('logo')) {
            $image = Upload::add($request->file('logo'), 'parties');
            $data['logo_upload_id'] = $image->id;
        }

        $party->update($data);

        return redirect()
            ->route(
                'admin.parties.edit',
                [
                    "party" => $party->id
                ]
            )
            ->with(['success' => 'Party updated successfully']);
    }
}
