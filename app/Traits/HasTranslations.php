<?php
namespace App\Traits;

use Illuminate\Support\Facades\App;
use Spatie\Translatable\HasTranslations as BaseHasTranslations;

trait HasTranslations
{
    use BaseHasTranslations;
    /**
     * Convert the model instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        $attributes = parent::toArray();
        foreach ($this->getTranslatableAttributes() as $field) {
            // laravel-translatable v6 returns null for a NULL column; the API has always sent "".
            $attributes[$field] = $this->getTranslation($field, App::getLocale()) ?? '';
        }
        return $attributes;
    }
}
