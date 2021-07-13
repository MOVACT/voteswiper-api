<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Inertia\Response;

class CacheController extends Controller
{
    /**
     * Clears the application cache
     *
     * @return Response
     */
    public function index()
    {
        Cache::flush();

        return redirect()->back()->with(['success' => 'The cache has been cleared successfully.']);
    }
}
