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
     * @Post("/parties")
     * @Versions({"v1"})
     * @Request({"slug": "state-election-saxony-anhalt-2021"}, headers={"Content-Language": "en"})
     * @Request({"id": 23}, headers={"Content-Language": "en"})
     */
    public function index(Request $request)
    {
        $isPreview = $request->header('API-Preview-Key', 'default') === env('API_PREVIEW_KEY');

        if (!$request->input('slug') && !$request->input('id')) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No election slug or id was provided.');
        }

        $currentLocale = App::getLocale();
        $value = $request->input('id') ?? $request->input('slug');

        $cacheKey = $currentLocale . '_parties_' . $value;

        if (!Cache::has($cacheKey) || $isPreview) {
            if ($request->input('id')) {
                $election = Election::where('id', $request->input('id'));
            } else {
                $election = Election::where(function($query) use($request, $currentLocale) {
                    $query->where('slug->' . $currentLocale, $request->input('slug'))->orWhere('slug->en', $request->input('slug'));
                });
            }

            if ($isPreview) {
                $election = $election->with('card')->firstOrFail();

                $parties = $election->parties()->where('playable', true)->with('logo')->orderBy('name')->get();
            } else {
                $election = $election->where('published', true)->with('card')->firstOrFail();

                $parties = $election->parties()->where('playable', true)->where('published', true)->with('logo')->orderBy('name')->get();
            }


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

            if (!$isPreview) {
                Cache::put($cacheKey, $list, now()->addMinutes(120));
            }
        }

        if ($isPreview) {
            return $list;
        }

        return Cache::get($cacheKey);
    }
}
