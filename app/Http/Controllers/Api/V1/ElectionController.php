<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Election;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ElectionController extends Controller
{
    /**
     * Get elections
     *
     * Fetches elections for a specific country
     *
     * @Post("/elections")
     * @Versions({"v1"})
     * @Request({"country": "germany", "include": "all"}, headers={"Content-Language": "en"})
     */
    public function index(Request $request)
    {
        if (!isset($request->input()["country"])) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No country slug was provided.');
        }

        $include = $request->input()["include"] ?? "all";

        if (!in_array($include, ["all", "upcoming", "past"])) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('Invalid include property. Can be "all", "upcoming" or "past".');
        }

        $currentLocale = App::getLocale();
        $paramCountry = $request->input()["country"];

        $cacheKey = $currentLocale . '_elections_' . $include . '_' . $paramCountry;

        if (!Cache::has($cacheKey)) {
            if (is_numeric($paramCountry)) {
                $country = Country::where('id', $paramCountry)->where('published', true)->firstOrFail();
            } else {
                $country = Country::where(function($query) use($paramCountry, $currentLocale) {
                    $query->where('slug->' . $currentLocale, $paramCountry)->orWhere('slug->en', $paramCountry);
                })->where('published', true)->firstOrFail();
            }

            $elections = $country
                ->elections()
                ->orderBy('voting_day', 'DESC')
                ->orderBy('playable', 'DESC')
                ->where('published', true)
                ->with('card');

            switch($include) {
                case 'upcoming':
                    $elections->whereDate('voting_day', '>=', Carbon::now());
                    break;
                case 'past';
                    $elections->whereDate('voting_day', '<', Carbon::now());
                    break;
            }

            Cache::put($cacheKey, $elections->get(), now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }

    /**
     * Get election
     *
     * Fetches election by slug or ID
     *
     * @Post("/election")
     * @Versions({"v1"})
     * @Request({"slug": "state-election-saxony-anhalt-2021"}, headers={"Content-Language": "en"})
     * @Request({"id": 21, headers={"Content-Language": "en"})
     */
    public function election(Request $request)
    {
        if (!$request->input('slug') && !$request->input('id')) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No election was provided.');
        }

        $currentLocale = App::getLocale();
        $value = $request->input('id') ?? $request->input('slug');

        $cacheKey = $currentLocale . '_election_' . '_' . $value;

        if (!Cache::has($cacheKey)) {
            if ($request->input('id')) {
                $election = Election::where('id', $request->input('id'))->where('published', true)->with('card')->firstOrFail();
            } else {
                $election = Election::where(function($query) use($request, $currentLocale) {
                    $query->where('slug->' . $currentLocale, $request->input('slug'))->orWhere('slug->en', $request->input('slug'));
                })->where('published', true)->with('card')->firstOrFail();
            }

            Cache::put($cacheKey, $election, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }

    /**
     * Election Alternative Links
     *
     * Fetches "alternate" links used in hreflang meta tags based on the current slug
     *
     * @Post("/alternateElectionSlugs")
     * @Versions({"v1"})
     * @Request({"slug": "landtagswahl-sachsen-anhalt-2021"}, headers={"Content-Language": "en"})
     */
    public function alternateElectionSlugs(Request $request)
    {
        $slug = $request->input()["slug"];
        $currentLocale = App::getLocale();

        $cacheKey = $currentLocale . '_alternateElectionSlugs_' . $slug;

        if (!Cache::has($cacheKey)) {
            $list = [];

            $election = Election::where('slug->' . $currentLocale, $slug)->orWhere('slug->en', $slug)->firstOrFail();
            $translations = $election->getTranslations();

            foreach(config('app.locales') as $locale) {
                $list[$locale] = $translations["slug"][$locale] ?? $translations["slug"]["en"];
            }

            Cache::put($cacheKey, $list, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }
}
