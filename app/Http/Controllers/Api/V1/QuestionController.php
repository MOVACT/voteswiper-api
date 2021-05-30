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
     * @Post("/questions")
     * @Versions({"v1"})
     * @Request({"slug": "state-election-saxony-anhalt-2021"}, headers={"Content-Language": "en"})
     * @Request({"id": 21, headers={"Content-Language": "en"})
     */
    public function index(Request $request)
    {
        if (!$request->input('slug') && !$request->input('id')) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException('No election slug or id was provided.');
        }

        $currentLocale = App::getLocale();
        $value = $request->input('id') ?? $request->input('slug');

        $cacheKey = $currentLocale . '_questions_' . $value;

        if (!Cache::has($cacheKey)) {
            if ($request->input('id')) {
                $election = Election::where('id', $request->input('id'));
            } else {
                $election = Election::where(function($query) use($request, $currentLocale) {
                    $query->where('slug->' . $currentLocale, $request->input('slug'))->orWhere('slug->en', $request->input('slug'));
                });
            }

            $election = $election->where('published', true)->where('playable', true)->firstOrFail();

            Cache::put($cacheKey, $election->questions()->ordered()->with('thumbnail')->get(), now()->addMinutes(120));
        }

        return Cache::get($cacheKey);
    }
}
