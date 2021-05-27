<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CreateOrEditCountry extends FormRequest
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
        return [
            'name' => 'string|required',
            'country_code' => [
                'string',
                'required',
                $this->country
                    ? Rule::unique('countries', 'country_code')->ignore($this->country->id)
                    : 'unique:countries,country_code'],
            'language_code' => 'string|required',
            'published' => 'boolean|required',
        ];
    }
}
