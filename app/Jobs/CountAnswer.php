<?php

namespace App\Jobs;

use App\Models\Swipe;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CountAnswer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $election_id;
    protected $question_id;
    protected $answer;
    protected $platform;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(int $election_id, int $question_id, int $answer, string $platform)
    {
        $this->election_id = $election_id;
        $this->question_id = $question_id;
        $this->answer = $answer;
        $this->platform = $platform;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Swipe::create([
            'election_id' => $this->election_id,
            'question_id' => $this->question_id,
            'answer' => $this->answer,
            'platform' => $this->platform,
        ]);
    }
}
