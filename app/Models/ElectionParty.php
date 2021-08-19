<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ElectionParty extends Pivot
{
    use HasFactory;

    public $incrementing = true;
    protected $primaryKey = "id";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'election_id',
        'party_id',
        'playable',
        'published',
        'program_link',
        'program_upload_id',
    ];

    protected $casts = [
        'published' => 'boolean',
        'playable' => 'boolean',
    ];

    public function answers(): HasMany
    {
      return $this->hasMany(Answer::class, 'electionparty_id');
    }

    /**
     * Get the uploaded file
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Upload::class, 'program_upload_id', 'id');
    }
}
