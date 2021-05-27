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

function graphqlQuery($query, $variables = [])
{
 $client = new Client([
      'base_uri' => 'https://www.voteswiper.org/!',
      'headers' => [
          'Content-Type' => 'application/json',
      ],
  ]);

  $response = $client->request("post", '', [
    'body' => json_encode([
        'query' => $query,
        'variables' => $variables,
    ]),
  ]);

  return new ArrayCollection(json_decode($response->getBody()->getContents(), true));
}

function searchForId($id, $array) {
    foreach ($array as $key => $val) {
        if ($val['question_id'] === $id) {
            return $key;
        }
    }
    return null;
}

class MigrateFromOldApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:api {--dry}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate content from old API';

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
        $baseUrl = 'https://voteswiper-assets.ams3.cdn.digitaloceanspaces.com/';

        function fetchFile($url, $try=1) {

            try{
                $file = file_get_contents($url);
                return $file;
            }
            catch(ErrorException $e){
                if($try <5){
                     sleep(10);
                     //optionnaly log or send notice mail with $e and $try
                     fetchFile($url, $try++);
                }
                else{
                     return false;
                }
            }
        }
        /**
         * Store remote images as asset
         */
        function storeImage(string $url, string $pathPrefix = '', $existingUpload = null) {
            if (!$existingUpload) {
                $preseveLocal = App::getLocale();

                App::setLocale('en');
            }
            $uploadedFileName = basename($url);

            $path = (!empty($pathPrefix) ? $pathPrefix . '/' : '') . uniqid();

            $filename = pathinfo($uploadedFileName, PATHINFO_FILENAME);
            $extension = pathinfo($uploadedFileName, PATHINFO_EXTENSION);

            $getFile = fetchFile($url);
            sleep(2);

            $safeFilename = Str::slug($filename) . '-' . Str::random(5) . '.' . $extension;
            $storedFilename = $path . '/' . $safeFilename;

            $file = Storage::put($storedFilename, $getFile);
            Storage::setVisibility($storedFilename, 'public');

            $im = imagecreatefromstring(Storage::get($storedFilename));
            $width = imagesx($im) ?? null;
            $height = imagesy($im) ?? null;

            if ($existingUpload) {
                $upload = $existingUpload;
            } else {
                $upload = new Upload();
            }

            $upload->filename = $storedFilename;
            $upload->filetype = Storage::mimeType($storedFilename);
            $upload->filesize = Storage::size($storedFilename);
            $upload->width = $width;
            $upload->height = $height;

            $upload->save();

            if (!$existingUpload) {
            App::setLocale($preseveLocal);
            }

            return $upload;
        }

        //$url = "https://voteswiper-assets.ams3.cdn.digitaloceanspaces.com/thumbnails/5c8a7dcace16f/1552580042_15525800425322691245c8a7dcace189.jpg";

        //storeImage($url, 'test');
        //$thumbnail = file_get_contents($url);

        $countriesQuery = <<<'Query'
            query Countries($locale: String!) {
                countries(locale: $locale) {
                    id
                    name
                    slug
                    country_code
                    language_code
                    elections_count
                }
          }
        Query;

        $electionsQuery = <<<'GRAPHQL'
        query Elections($locale: String!, $country: Int!) {
            elections(locale: $locale, country: $country) {
              id
              name
              slug
              card
              voting_day
              partner_logo
              partner_name
              partner_text
              voting_day
              active
              active_date
              parties {
                id
                election_id
                name
                slug
                full_name
                logo
                pivot {
                  id
                  program
                  program_pdf
                  answers {
                    id
                    question_id
                    answer
                    reason
                  }
                }
              }
            }
            pastElections: elections(locale: $locale, country: $country, past: true) {
              id
              name
              slug
              card
              voting_day
              partner_logo
              partner_name
              partner_text
              voting_day
              active
              active_date
              parties {
                id
                election_id
                name
                slug
                full_name
                logo
                pivot {
                  id
                  program
                  program_pdf
                  answers {
                    id
                    question_id
                    answer
                    reason
                  }
                }
              }
            }
          }
        GRAPHQL;

        $questionsQuery = <<<'QUERY'
        query Questoins($locale: String!, $election: Int!) {
            questions(locale: $locale, election: $election) {
              id
              question
              title
              video_url
              video_legacy
              thumbnail
              explainer_text
            }
          }
        QUERY;

        $isRunningDry = $this->option('dry');

        $oldCountries = graphqlQuery($countriesQuery, ['locale' => 'en'])["data"]["countries"];
        // set english
        App::setLocale('en');
        $this->info('Switching locale to EN');

        $countryIdMappings = [];
        $electionIdMappings = [];
        $questionIdMappings = [];
        $partyIdMappings = [];

        /**
         * 1. Loop over countries and create them
         */
        foreach($oldCountries as $oldCountry) {

            // Skipping countries if needed
            /* if (in_array($oldCountry['country_code'], ['at', 'fi', 'fr', 'de'])) {
                $this->info('Skipping ' . $oldCountry['name']);
                sleep(1);
                continue;
            } */

            $this->newLine(2);
            $this->info('Creating country ' . $oldCountry['name']);
            if (!$isRunningDry) {
                $country = Country::create([
                    'country_code' => $oldCountry['country_code'],
                    'language_code' => $oldCountry['language_code'],
                    'name' => $oldCountry['name'],
                    'published' => true,
                ]);

                $countryIdMappings[$oldCountry['id']] = $country;
            }

            $oldElections = graphqlQuery($electionsQuery, ['locale' => 'en', 'country' => $oldCountry['id']]);
            $allOldElectionsForCountry = array_merge($oldElections['data']['elections'], $oldElections['data']['pastElections']);


            /**
             * Loop over elections
             */
            $this->newLine(1);
            foreach($allOldElectionsForCountry as $oldElection) {
                $this->info('Creating election ' . $oldElection['name']);
                if (!$isRunningDry) {
                    // Save card
                    $cardImage = storeImage($baseUrl . $oldElection['card'], 'elections');
                    $election = $country->elections()->create([
                        'name' => $oldElection['name'],
                        'published' => true,
                        'playable' => true,
                        'card_upload_id' => $cardImage->id,
                        'voting_day' => $oldElection['voting_day'],
                        'playable_date' => $oldElection['active_date'],
                        'translations_available' => ['en', '' . $country['language_code']],
                    ]);

                    $electionIdMappings[$oldElection['id']] = $election;
                }

                $oldQuestions = graphqlQuery($questionsQuery, ['locale' => 'en', 'election' => $oldElection['id']])['data']['questions'];

                /**
                 * Loop over questions
                 */
                foreach($oldQuestions as $oldQuestion) {
                    $this->info('Creating question "' . $oldQuestion['question'] . '"');
                    if (!$isRunningDry) {
                        // Save thumbnail
                        $thumbnailImage = storeImage($baseUrl . $oldQuestion['thumbnail'], 'thumbnails');

                        $question = $electionIdMappings[$oldElection['id']]->questions()->create([
                            'thesis' => $oldQuestion['question'],
                            'topic' => $oldQuestion['title'],
                            'video_url' => $oldQuestion['video_url'],
                            'explainer_text' => $oldQuestion['explainer_text'],
                            'thumbnail_upload_id' => $thumbnailImage->id,
                        ]);

                        $questionIdMappings[$oldQuestion['id']] = $question;
                    }
                    // sleep(2); //file
                }

                 /**
                  * Loop over parties
                  */
                foreach($oldElection['parties'] as $oldParty) {
                    if (!isset($partyIdMappings[$oldParty['id']])) {
                        // create party
                        $this->info('Creating party ' . $oldParty['name']);

                        if (!$isRunningDry) {
                            // Save logo
                            $logoImage = storeImage($baseUrl . $oldParty['logo'], 'parties');
                            // sleep(2); //file

                            $countryForParty = $countryIdMappings[$oldCountry['id']]->id;

                            $partyIdMappings[$oldParty['id']] = Party::create([
                                'country_id' => $countryForParty,
                                'name' => $oldParty['name'],
                                'full_name' => $oldParty['full_name'],
                                'logo_upload_id' => $logoImage->id,
                            ]);
                            // sleep(2); //file
                        } else {
                            // sleep(0.25);
                        }


                    } else {
                        $this->error('Party ' . $oldParty['name'] . ' already exists, skipping');
                    }

                    /**
                     * Attach party to election
                     */
                    $this->info('Attaching party....');

                    if (!$isRunningDry) {
                        $electionIdMappings[$oldElection['id']]->parties()->attach($partyIdMappings[$oldParty['id']]->id, [
                            'program_link' => $oldParty['pivot']['program'],
                            'playable' => true,
                            'published' => true,
                        ]);
                    }

                    $this->newLine(1);
                    $this->info('Answering questions....');

                    if (!$isRunningDry) {
                        $e = Election::where('id', $electionIdMappings[$oldElection['id']]->id)->first();
                        $pivot = $e->parties->find($partyIdMappings[$oldParty['id']]->id)->pivot;
                    }

                    /**
                     * Loop over questions
                     */
                    foreach($oldQuestions as $oldQuestion) {
                        $this->info('Answering question ' . $oldQuestion['question']);
                        if (!$isRunningDry) {
                            $findAnswer = searchForId($oldQuestion['id'], $oldParty['pivot']['answers']);
                            $pivot->answers()->create([
                                'question_id' => $questionIdMappings[$oldQuestion['id']]->id,
                                'answer' => $oldParty['pivot']['answers'][$findAnswer]['answer'],
                                'reason' => $oldParty['pivot']['answers'][$findAnswer]['reason'],
                            ]);
                        }

                        // sleep(0.25);
                    }
                }

                // sleep(0.25);
            }

            /**
             * Translate elections
             */
            $this->newLine(1);
            $this->info('Translating elections for ' . $oldCountry['name']);
            $this->info('Switching to locale ' . $oldCountry['language_code']);

            App::setLocale($oldCountry['language_code']);

            $oldElections = graphqlQuery($electionsQuery, ['locale' => $oldCountry['language_code'], 'country' => $oldCountry['id']]);
            $allOldElectionsForCountry = array_merge($oldElections['data']['elections'], $oldElections['data']['pastElections']);

            foreach($allOldElectionsForCountry as $oldElection)
            {
                $this->info('Translating election ' . $oldElection['name']);

                if (!$isRunningDry) {
                    // Save card
                    $cardImage = storeImage($baseUrl . $oldElection['card'], 'elections', $electionIdMappings[$oldElection['id']]->card()->first());

                    $electionIdMappings[$oldElection['id']]->name = $oldElection["name"];
                    $electionIdMappings[$oldElection['id']]->save();
                }

                $oldQuestions = graphqlQuery($questionsQuery, ['locale' => $oldCountry['language_code'], 'election' => $oldElection['id']])['data']['questions'];

                /**
                 * Translating questions
                 */
                foreach($oldQuestions as $oldQuestion) {
                    $this->info('Translating question ' . $oldQuestion['question']);

                    if (!$isRunningDry) {
                        $questionIdMappings[$oldQuestion['id']]->topic = $oldQuestion['title'];
                        $questionIdMappings[$oldQuestion['id']]->thesis = $oldQuestion['question'];
                        $questionIdMappings[$oldQuestion['id']]->save();
                    }

                    // sleep(0.25);
                }
            }

            App::setLocale('en');
        }

        // sleep(2);

        /**
         * Loop over locales to translate countries
         */
        $this->newLine(2);
        $this->info('Translating countries....');

        foreach(config('app.locales') as $locale) {
            App::setLocale($locale);
            $this->info('Switching locale to ' . $locale);

            $translatedCountries = graphqlQuery($countriesQuery, ['locale' => $locale])["data"]["countries"];

            foreach($translatedCountries as $translatedCountry) {
                $this->info('Translating ' . $translatedCountry['name']);

                if (!$isRunningDry) {
                    $countryIdMappings[$translatedCountry['id']]->name = $translatedCountry['name'];
                    $countryIdMappings[$translatedCountry['id']]->save();
                }
            }
        }

        return 0;
    }
}
