<?php

namespace App\Console\Commands;

use App\Models\Country;
use App\Models\Election;
use App\Models\Party;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use App\Models\Upload;
use ErrorException;
use GuzzleHttp\Client;
use League\CommonMark\Util\ArrayCollection;

/**
 * CSV Headers:
 * ID, Partei, [question id], [question id]C
 */

class ImportAnswers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:answers {file} {--election=} {--dry}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import Answers for election';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $isRunningDry = $this->option('dry');

        App::setLocale('en');

        $this->info('Starting import of answers...');

        $this->info('Fetching election...');

        $election = Election::find($this->option('election'));

        if (!$election) {
            $this->error('Election not found.');
            return 0;
        }

        $this->line('Loaded election ' . $election->name);

        $this->newLine(1);

        $this->info('Downloading file ' . $this->argument('file'));

        // Download file
        $csv = array_map('str_getcsv', file($this->argument('file')));

        // Parse CSV
        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv);

        // Loop over parties
        foreach($csv as $party) {
            $this->info('Importing answers for ' . $party["Partei"]);

            $pivot = $election->parties->find($party["ID"])->pivot;

            $index = 0;
            foreach($party as $key => $value) {
                // Skip first two columns
                if ($index > 1 && $index % 2 == 0) {
                    // Get correct value for answer
                    $answerValue = 0;
                    if ($value === 'Nein') $answerValue = 1;
                    if ($value === 'Ja') $answerValue = 2;

                    $answer = $pivot->answers()->where('question_id', $key)->first();

                    if (!$isRunningDry) {
                        if ($answer) {
                            $answer->update([
                                'answer' => $answerValue,
                                'reason' => $party[$key . "C"]
                            ]);
                        } else {
                            $pivot->answers()->create([
                                'question_id' => $key,
                                'answer' => $answerValue,
                                'reason' => $party[$key . "C"]
                            ]);
                        }
                    }

                    sleep(0.2);
                }

                $index++;
            }
        }

        $this->info('Import completed');

        return 0;
    }
}
