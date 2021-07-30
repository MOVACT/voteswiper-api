<?php

namespace App\Jobs;

use App\Models\Result;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SaveResult implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $election_id;
    protected $result;
    protected $party_id;
    protected $platform;
    protected $locale;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(int $election_id, string $result, int $party_id, string $platform, string $locale)
    {
        $this->election_id = $election_id;
        $this->result = json_decode($result);
        $this->party_id = $party_id;
        $this->platform = $platform;
        $this->locale = $locale;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Result::create([
            'election_id' => $this->election_id,
            'result' => $this->result,
            'party_id' => $this->party_id,
            'platform' => $this->platform,
            'locale' => $this->locale,
        ]);
    }
}
