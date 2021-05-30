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
    $api->post('countries', [CountryController::class, 'index']);
    $api->post('alternateCountrySlugs', [CountryController::class, 'alternateCountrySlugs']);
    $api->post('countryBySlug', [CountryController::class, 'countryBySlug']);

    $api->post('elections', [ElectionController::class, 'index']);
    $api->post('election', [ElectionController::class, 'election']);
    $api->post('alternateElectionSlugs', [ElectionController::class, 'alternateElectionSlugs']);

    $api->post('parties', [PartyController::class, 'index']);

    $api->post('questions', [QuestionController::class, 'index']);
});
