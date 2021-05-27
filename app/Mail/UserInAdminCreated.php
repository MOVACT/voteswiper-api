<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class UserInAdminCreated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The user that was created
     *
     * @var \App\Models\User
     */
    public $user;

    /**
     * The password of the user
     *
     * @var string
     */
    public $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, string $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.user.created')
                    ->with([
                        'user' => $this->user,
                        'password' => $this->password,
                        'url' => URL::route('admin.dashboard')
                    ]);
    }
}
