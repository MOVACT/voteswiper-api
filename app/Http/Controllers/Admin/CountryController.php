<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrEditCountry;
use App\Models\Country;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class CountryController extends Controller
{
    /**
     * List all countries in the database
     *
     * @return Response
     */
    public function index()
    {
        $countries = Country::orderBy('name')->withCount('parties')->get();

        return Inertia::render('countries', [
            'countries' => $countries
        ]);
    }

    /**
     * Show form for creating country
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
                'redirect' => route('admin.countries.create')
            ]);
        }

        return Inertia::render('countries/createOrEdit');
    }

    /**
     * Store the new country
     *
     * @param CreateOrEditCountry $request
     * @return RedirectResponse
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function store(CreateOrEditCountry $request) {
        $country = Country::create($request->input());

        return redirect()->route('admin.countries')->with(['success' => 'The country was created successfully.']);
    }

    /**
     * Show edit user form
     *
     * @param Country $country
     * @return Response
     */
    public function edit(Country $country) {
        return Inertia::render('countries/createOrEdit', [
            'country' => array_merge($country->toArray(), [
                'name' => $country->getTranslation('name', App::currentLocale(), false),
                'slug' => $country->getTranslation('slug', App::currentLocale(), false),
            ]),
        ]);
    }

    /**
     * Store the updated country
     *
     * @param CreateOrEditCountry $request
     * @param Country $country
     * @return RedirectResponse
     * @throws MassAssignmentException
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function update(CreateOrEditCountry $request, Country $country) {
        $country->update($request->input());

        return redirect()
            ->route(
                'admin.countries.edit',
                [
                    "country" => $country->id
                ]
            )
            ->with(['success' => 'Country updated successfully']);
    }

    /**
     * Display details for a country
     *
     * @param Country $country
     * @return Response
     */
    public function show(Country $country) {
        return Inertia::render('countries/show', [
            'country' => array_merge($country->toArray(), $country->getTranslations())
        ]);
    }
}
