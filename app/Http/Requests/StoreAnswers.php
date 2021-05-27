<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAnswers extends FormRequest
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
        $questions = $this->election->questions()->get();
        $rules = [];

        foreach($questions as $question) {
            $rules['answer_' . $question->id] = 'required|digits_between:0,2';
            $rules['reason_' . $question->id] = 'string||nullable';
        }

        return $rules;
    }
}
