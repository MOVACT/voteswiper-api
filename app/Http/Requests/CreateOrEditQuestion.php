<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateOrEditQuestion extends FormRequest
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
            'topic' => 'string|required',
            'thesis' => 'string|required',
            'video_url' => 'string|url|nullable',
            'explainer_text' => 'string|nullable',
        ];

        if ($this->question) {
            $rules['thumbnail'] = 'image|nullable|max:1024|mimes:jpeg,png,gif';
            $rules['thumbnail_upload_id'] = 'integer|required|exists:uploads,id';
        } else {
            $rules['thumbnail'] = 'image|required|max:1024|mimes:jpeg,png,gif';
        }

        return $rules;
    }
}
