<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Question extends Model implements Sortable
{
    use HasFactory, HasTranslations, SortableTrait;

    /**
     * The attributes that are translatable.
     *
     * @var array
     */
    public $translatable = [
        'thesis',
        'topic',
        'video_url',
        'explainer_text',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'election_id',
        'thesis',
        'topic',
        'video_url',
        'explainer_text',
        'sort_order',
        'thumbnail_upload_id',
    ];

    /**
     * Get the country
     */
    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    /**
     * Get the uploaded file
     */
    public function thumbnail(): BelongsTo
    {
        return $this->belongsTo(Upload::class, 'thumbnail_upload_id', 'id');
    }

    /**
     * Sort query based on election
     */
    public function buildSortQuery()
    {
        return static::query()->where('election_id', $this->election_id);
    }
}
