<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'election_id',
        'party_id',
        'result',
        'platform',
    ];

    protected $casts = [
        'result' => 'array',
    ];

    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }
}
