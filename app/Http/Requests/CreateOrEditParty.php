<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CreateOrEditParty extends FormRequest
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
            'name' => 'string|required',
            'full_name' => 'string|required',
            'url' => 'string|nullable',
        ];

        if ($this->party) {
            $rules['logo'] = 'image|nullable|max:1024|mimes:jpeg,png,gif';
            $rules['logo_upload_id'] = 'integer|required|exists:uploads,id';
        } else {
            $rules['logo'] = 'image|required|max:1024|mimes:jpeg,png,gif';
        }

        return $rules;
    }
}
