<?php

use App\Http\Controllers\Admin\CacheController;
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ElectionController;
use App\Http\Controllers\Admin\ElectionPartyController;
use App\Http\Controllers\Admin\ElectionQuestionController;
use App\Http\Controllers\Admin\PartyController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::name('admin.')->middleware(["web", "auth"])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/lang/{key}', function ($key) {
        session()->put('locale', $key);
        return isset(Request::query()['redirect']) ? redirect(Request::query()['redirect']) : redirect()->back();
    })->name('locale');

    Route::get('/cache', [CacheController::class, 'index'])->name('cache');

    /**
     * User Management
     */
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/create', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');

    /**
     * Countries
     */
    Route::get('/countries', [CountryController::class, 'index'])->name('countries');
    Route::get('/countries/create', [CountryController::class, 'create'])->name('countries.create');
    Route::post('/countries/create', [CountryController::class, 'store'])->name('countries.store');
    Route::get('/countries/{country}/edit', [CountryController::class, 'edit'])->name('countries.edit');
    Route::put('/countries/{country}', [CountryController::class, 'update'])->name('countries.update');
    Route::get('/countries/{country}', [CountryController::class, 'show'])->name('countries.show');

    /**
     * Parties
     */
    Route::get('/parties', [PartyController::class, 'index'])->name('parties');
    Route::get('/parties/create', [PartyController::class, 'create'])->name('parties.create');
    Route::post('/parties/create', [PartyController::class, 'store'])->name('parties.store');
    Route::get('/parties/{party}/edit', [PartyController::class, 'edit'])->name('parties.edit');
    Route::put('/parties/{party}', [PartyController::class, 'update'])->name('parties.update');
    Route::get('/parties/{party}', [PartyController::class, 'show'])->name('parties.show');

    /**
     * Elections
     */
    Route::get('/elections', [ElectionController::class, 'index'])->name('elections');
    Route::get('/elections/create', [ElectionController::class, 'create'])->name('elections.create');
    Route::post('/elections/create', [ElectionController::class, 'store'])->name('elections.store');
    Route::get('/elections/{election}/edit', [ElectionController::class, 'edit'])->name('elections.edit');
    Route::put('/elections/{election}', [ElectionController::class, 'update'])->name('elections.update');
    Route::get('/elections/{election}', [ElectionController::class, 'show'])->name('elections.show');

    /**
     * Election - Questions
     */
    Route::get('/elections/{election}/questions', [ElectionQuestionController::class, 'index'])->name('election.questions');
    Route::get('/elections/{election}/questions/create', [ElectionQuestionController::class, 'create'])->name('election.questions.create');
    Route::post('/elections/{election}/questions/create', [ElectionQuestionController::class, 'store'])->name('election.questions.store');
    Route::get('/elections/{election}/questions/{question}/edit', [ElectionQuestionController::class, 'edit'])->name('election.questions.edit');
    Route::put('/elections/{election}/questions/{question}', [ElectionQuestionController::class, 'update'])->name('election.questions.update');
    Route::get('/elections/{election}/questions/{question}', [ElectionCoElectionQuestionControllerntroller::class, 'show'])->name('election.questions.show');

    Route::post('/elections/{election}/questions/{question}/up', [ElectionQuestionController::class, 'moveUp'])->name('election.questions.up');
    Route::post('/elections/{election}/questions/{question}/down', [ElectionQuestionController::class, 'moveDown'])->name('election.questions.down');

    /**
     * Election - Parties
     */
    Route::get('/elections/{election}/parties', [ElectionPartyController::class, 'index'])->name('election.parties');
    Route::get('/elections/{election}/parties/create', [ElectionPartyController::class, 'create'])->name('election.parties.create');
    Route::post('/elections/{election}/parties/create', [ElectionPartyController::class, 'store'])->name('election.parties.store');
    Route::get('/elections/{election}/parties/{party}/edit', [ElectionPartyController::class, 'edit'])->name('election.parties.edit');
    Route::put('/elections/{election}/parties/{party}', [ElectionPartyController::class, 'update'])->name('election.parties.update');
    Route::get('/elections/{election}/parties/{party}', [ElectionPartyController::class, 'show'])->name('election.parties.show');
    Route::get('/elections/{election}/parties/{party}/answers', [ElectionPartyController::class, 'editAnswers'])->name('election.parties.answers');
    Route::post('/elections/{election}/parties/{party}/answers', [ElectionPartyController::class, 'storeAnswers'])->name('election.parties.answers.store');
});
