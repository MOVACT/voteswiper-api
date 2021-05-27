<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Sluggable\HasSlug;

class Party extends Model
{
    use HasFactory, HasSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'country_id',
        'name',
        'slug',
        'full_name',
        'url',
        'logo_upload_id',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the country
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the uploaded file
     */
    public function logo(): BelongsTo
    {
        return $this->belongsTo(Upload::class, 'logo_upload_id', 'id');
    }

    public function elections(): BelongsToMany
    {
        return $this->belongsToMany(Election::class)->using(ElectionParty::class)
            ->withPivot('playable', 'published', 'program_upload_id', 'program_link', 'id')
            ->withTimestamps();
    }
}
