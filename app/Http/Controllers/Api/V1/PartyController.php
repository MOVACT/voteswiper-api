<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Election;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PartyController extends Controller
{
    /**
     * Get parties that participate in an election
     *
     * Fetches parties for a specific election
     *
     * @Get("/parties")
     * @Versions({"v1"})
     * @Request({"election": "state-election-saxony-anhalt-2021"}, headers={"Content-Language": "en"})
     */
    public function index(Request $request)
    {
        if (!isset($request->input()["election"])) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No election slug was provided.');
        }

        $currentLocale = App::getLocale();
        $slug = $request->input()["election"];

        $cacheKey = $currentLocale . '_parties_' . $slug;

        if (!Cache::has($cacheKey)) {
            $election = Election::where(function($query) use($slug, $currentLocale) {
                $query->where('slug->' . $currentLocale, $slug)->orWhere('slug->en', $slug);
            })->where('published', true)->with('card')->firstOrFail();

            $parties = $election->parties()->where('published', true)->with('logo')->orderBy('name')->get();

            $list = [];

            foreach($parties as $party) {
                $list[] = array_merge(
                    $party->toArray(),
                    [
                        'pivot' => array_merge(
                            $party->pivot->toArray(),
                            [
                                'answers' => $party->pivot->answers
                            ]
                        )
                    ]
                );
            }

            Cache::put($cacheKey, $list, now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }
}
