<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Election;
use App\Models\Initiation;
use App\Models\Result;
use App\Models\Swipe;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StatisticController extends Controller
{
    public function index()
    {
        $elections = Election::orderBy('voting_day', 'DESC')->get();
        $swipes = Swipe::count();
        $initiations = Initiation::count();
        $results = Result::count();

        return Inertia::render('statistic', [
            'elections' => $elections,
            'swipes' => $swipes,
            'initiations' => $initiations,
            'results' => $results,
        ]);
    }

    public function election(Election $election)
    {
        $swipes = Swipe::where('election_id', $election->id)->count();
        $initiations = Initiation::where('election_id', $election->id)->count();
        $results = Result::where('election_id', $election->id)->count();

        $groupedSwipes = DB::table('swipes')
            ->where('election_id', $election->id)
            ->select('platform', DB::raw('count(*) as total'))
            ->groupBy('platform')
            ->get();

        return Inertia::render('statistic/election', [
            'election' => $election,
            'swipes' => $swipes,
            'initiations' => $initiations,
            'results' => $results,
            'groupedSwipes' => $groupedSwipes
        ]);
    }
}
