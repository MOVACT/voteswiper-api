<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CountryController extends Controller
{
    /**
     * Get countries
     *
     * Fetch all the countries
     *
     * @Get("/countries")
     * @Versions({"v1"})
     * @Request({}, headers={"Content-Language": "en"})
     * @Response(200, body={{{"id": 2, "country_code": "fr", "language_code": "fr", "name": "France", "slug": "france", "published": true, "created_at": "2021-02-27T21:11:11.000000Z", "updated_at": "2021-02-27T21:11:11.000000Z"}}})
     */
    public function index()
    {
        $cacheKey = App::getLocale() . '_countries';

        if (!Cache::has($cacheKey)) {
            $countries = Country::where('published', true)->orderBy('name->' . App::getLocale(), 'ASC')->get();
            Cache::put($cacheKey, $countries, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }

    /**
     * Get country
     *
     * Fetch a single country
     *
     * @Get("/countryBySlug)
     * @Versions({"v1"})
     * @Request({"slug": "germany"}, headers={"Content-Language": "en"})
     */
    public function countryBySlug(Request $request)
    {
        if (!isset($request->input()["slug"])) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No slug was provided.');
        }

        $slug = $request->input()["slug"];
        $currentLocale = App::getLocale();

        $cacheKey = $currentLocale . '_countryBySlug_' . $slug;

        if (!Cache::has($cacheKey)) {
            $country = Country::where(function($query) use($slug, $currentLocale) {
                $query->where('slug->' . $currentLocale, $slug)->orWhere('slug->en', $slug);
            })->where('published', true)->firstOrFail();

            Cache::put($cacheKey, $country, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }

    /**
     * Country Alternative Links
     *
     * Fetches "alternate" links used in hreflang meta tags based on the current slug
     *
     * @Get("/alternateCountrySlugs")
     * @Versions({"v1"})
     * @Request({"slug": "germany"}, headers={"Content-Language": "en"})
     * @Response(200, body={"en": "germany", "de": "deutschland", "fr": "allemagne"})
     */
    public function alternateCountrySlugs(Request $request)
    {
        if (!isset($request->input()["slug"])) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No slug was provided.');
        }

        $slug = $request->input()["slug"];
        $currentLocale = App::getLocale();

        $cacheKey = $currentLocale . '_alternateCountrySlugs_' . $slug;

        if (!Cache::has($cacheKey)) {
            $list = [];

            $country = Country::where(function($query) use($slug, $currentLocale) {
                $query->where('slug->' . $currentLocale, $slug)->orWhere('slug->en', $slug);
            })->where('published', true)->firstOrFail();
            $translations = $country->getTranslations();

            foreach(config('app.locales') as $locale) {
                $list[$locale] = $translations["slug"][$locale] ?? $translations["slug"]["en"];
            }

            Cache::put($cacheKey, $list, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }
}
