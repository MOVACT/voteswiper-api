<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AttachOrSyncParty extends FormRequest
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
            'published' => 'boolean|required',
            'playable' => 'boolean|required',
            'program_link' => 'string|url|nullable',
        ];

        $rules['program'] = 'file|nullable|max:15360|mimes:pdf';
        $rules['program_upload_id'] = 'integer|nullable|exists:uploads,id';

        if (!$this->party) {
            $rules['party_id'] = 'integer|required|exists:parties,id';
        }

        return $rules;
    }
}
