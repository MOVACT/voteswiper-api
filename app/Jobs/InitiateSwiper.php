<?php

namespace App\Jobs;

use App\Models\Initiation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class InitiateSwiper implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $election_id;
    protected $platform;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(int $election_id, string $platform)
    {
        $this->election_id = $election_id;
        $this->platform = $platform;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Initiation::create([
            'election_id' => $this->election_id,
            'platform' => $this->platform,
        ]);
    }
}
