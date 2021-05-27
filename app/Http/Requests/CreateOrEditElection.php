<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateOrEditElection extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'country_id' => 'integer|required|exists:countries,id',
            'published' => 'boolean|required',
            'playable' => 'boolean|required',
            'name' => 'string|required',
            'voting_day' => 'string|date|required',
            'playable_date' => 'string|date|required',
            'translations_available' => 'array|required',
        ];

        if ($this->election) {
            $rules['card'] = 'image|nullable|max:1024|mimes:jpeg,png,gif';
            $rules['card_upload_id'] = 'integer|required|exists:uploads,id';
        } else {
            $rules['card'] = 'image|required|max:1024|mimes:jpeg,png,gif';
        }

        return $rules;
    }
}
