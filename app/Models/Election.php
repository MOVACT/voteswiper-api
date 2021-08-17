<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasTranslatableSlug;
use Spatie\Sluggable\SlugOptions;
use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Election extends Model
{
    use HasFactory, HasTranslations, HasTranslatableSlug;

    /**
     * The attributes that are translatable.
     *
     * @var array
     */
    public $translatable = [
        'name',
        'followup_link',
        'slug'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'country_id',
        'name',
        'followup_link',
        'slug',
        'published',
        'playable',
        'voting_day',
        'playable_date',
        'translations_available',
        'card_upload_id',
    ];

    protected $casts = [
        'translations_available' => 'array',
        'published' => 'boolean',
        'playable' => 'boolean',
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

    protected $appends = [
        'parties_participating',
        'parties_not_participating'
    ];

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
    public function card(): BelongsTo
    {
        return $this->belongsTo(Upload::class, 'card_upload_id', 'id');
    }

    /*
     * The elections questions
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function parties(): BelongsToMany
    {
        return $this->belongsToMany(Party::class)
            ->using(ElectionParty::class)
            ->withPivot('playable', 'published', 'program_upload_id', 'program_link', 'id')
            ->withTimestamps();
    }

    public function getPartiesParticipatingAttribute() {
        return $this->parties()->wherePivot('playable', true)->count();
    }

    public function getPartiesNotParticipatingAttribute() {
        return $this->parties()->wherePivot('playable', false)->count();
    }
}
