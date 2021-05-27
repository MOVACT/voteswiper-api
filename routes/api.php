<?php

use App\Http\Controllers\Api\V1\CountryController;
use App\Http\Controllers\Api\V1\ElectionController;
use App\Http\Controllers\Api\V1\PartyController;
use App\Http\Controllers\Api\V1\QuestionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->get('countries', [CountryController::class, 'index']);
    $api->get('alternateCountrySlugs', [CountryController::class, 'alternateCountrySlugs']);
    $api->get('countryBySlug', [CountryController::class, 'countryBySlug']);

    $api->get('elections', [ElectionController::class, 'index']);
    $api->get('electionBySlug', [ElectionController::class, 'electionBySlug']);
    $api->get('alternateElectionSlugs', [ElectionController::class, 'alternateElectionSlugs']);

    $api->get('parties', [PartyController::class, 'index']);

    $api->get('questions', [QuestionController::class, 'index']);
});
