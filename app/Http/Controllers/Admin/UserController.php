<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrEditUser;
use App\Mail\UserInAdminCreated;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Inertia\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class UserController extends Controller
{
    /**
     * List all users in the database
     *
     * @return Response
     */
    public function index()
    {
        $users = User::orderBy('name')->get(['id', 'name', 'email']);

        return Inertia::render('users', [
            'users' => $users
        ]);
    }

    /**
     * Shows the form for creating a new user
     *
     * @return Response
     */
    public function create()
    {
        return Inertia::render('users/createOrEdit');
    }

    /**
     * Save new user
     *
     * @param CreateOrEditUser $request
     * @return RedirectResponse
     * @throws Exception
     * @throws BindingResolutionException
     * @throws RouteNotFoundException
     */
    public function store(CreateOrEditUser $request) {
        $password = Str::random(15);
        $passwordHash = Hash::make($password);

        $userData = $request->input();
        $userData['email_verified_at'] = Carbon::now();
        $userData['password'] = $passwordHash;

        $user = User::create($userData);

        if ($user) Mail::to($user->email)->send(new UserInAdminCreated($user, $password));

        return redirect()->route('admin.users')->with(['success' => 'The user was created successfully.']);
    }

    /**
     * Show edit user form
     *
     * @param User $user
     * @return Response
     */
    public function edit(User $user) {
        return Inertia::render('users/createOrEdit', [
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name
            ]
        ]);
    }

    public function update(CreateOrEditUser $request, User $user) {
        $user->update($request->input());

        return redirect()
            ->route(
                'admin.users.edit',
                [
                    "user" => $user->id
                ]
            )
            ->with(['success' => 'User updated successfully']);
    }
}
