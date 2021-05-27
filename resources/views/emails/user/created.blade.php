@component('mail::message')
# User account created

You can now login to the VoteSwiper Dashboard. Your password is:

{{ $password }}

@component('mail::button', ['url' => $url])
Login
@endcomponent

@endcomponent
