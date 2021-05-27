<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Election;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class QuestionController extends Controller
{
    /**
     * Get questions
     *
     * Fetches questions for a specific election
     *
     * @Get("/questions")
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

        $cacheKey = $currentLocale . '_questions_' . $slug;

        if (!Cache::has($cacheKey)) {
            $election = Election::where(function($query) use($slug, $currentLocale) {
                $query->where('slug->' . $currentLocale, $slug)->orWhere('slug->en', $slug);
            })->where('published', true)->where('playable', true)->firstOrFail();

            Cache::put($cacheKey, $election->questions()->ordered()->with('thumbnail')->get(), now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }
}
