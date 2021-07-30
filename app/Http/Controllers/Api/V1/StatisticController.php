<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Jobs\CountAnswer;
use App\Jobs\InitiateSwiper;
use App\Jobs\SaveResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class StatisticController extends Controller
{
    /**
     * Track Swipe
     *
     * @Post("/statistics/countAnswer")
     * @Versions({"v1"})
     * @Request({}, headers={"Content-Language": "en"})
     */
    public function countAnswer(Request $request)
    {
        CountAnswer::dispatch(
            $request->input('election_id'),
            $request->input('question_id'),
            $request->input('answer'),
            $request->input('platform'),
            App::getLocale(),
        );

        return ['status' => 'ok'];
    }

    /**
     * Initiate
     *
     * @Post("/statistics/initiate")
     * @Versions({"v1"})
     * @Request({}, headers={"Content-Language": "en"})
     */
    public function initiate(Request $request)
    {
        InitiateSwiper::dispatch(
            $request->input('election_id'),
            $request->input('platform'),
            App::getLocale(),
        );

        return ['status' => 'ok'];
    }

    /**
     * Save Result
     *
     * @Post("/statistics/initiate")
     * @Versions({"v1"})
     * @Request({}, headers={"Content-Language": "en"})
     */
    public function saveResult(Request $request)
    {
        SaveResult::dispatch(
            $request->input('election_id'),
            $request->input('result'),
            $request->input('top_party_id'),
            $request->input('platform'),
            App::getLocale(),
        );

        return ['status' => 'ok'];
    }
}
