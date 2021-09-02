# VoteSwiper API

The following document describes our API endpoints. We will follow up with a more sophisticated API documentation in the future, but since we got a lot of requests on acquiring raw data, we will provide this document in the meantime.

## Base URL

The base URL for our api is `https://api.voteswiper.org/api`.

## Fetching a specific locale

By specifying the `Content-Language` header in your request, you can fetch data in a specific locale. Please note, that our fallback is English, so if some content is not translated (yet), you will get results in english.

Available values are

- en *(English)*
- ar *(Arabic)*
- de *(German)*
- sv *(Swedish)*
- fr *(French)*
- fi *(Finnish)*
- ru *(Russian)*
- tr *(Turkish)*
- ku *(Kurdish)*
- fa *(Farsi)*

## API requests
### Fetch Countries

Fetch a list of all countries

**URL** : `/countries`

**Method** : `POST`

#### Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": 3,
    "country_code": "at",
    "language_code": "de",
    "name": "Austria",
    "slug": "austria",
    "published": true,
    "created_at": "2021-05-27T09:26:27.000000Z",
    "updated_at": "2021-08-16T17:40:47.000000Z"
  },
  {
    "id": 4,
    "country_code": "fi",
    "language_code": "fi",
    "name": "Finland",
    "slug": "finland",
    "published": true,
    "created_at": "2021-05-27T09:29:41.000000Z",
    "updated_at": "2021-08-16T17:44:59.000000Z"
  }
]
```

### Fetch Elections for country

Fetch a list of all elections for a specific country by slug

**URL** : `/elections`

**Method** : `POST`

**Data**: 
```json
{
  "country": "germany",
  // optional, can be "all", "upcoming" or "past"
  "include": "all"
}
```

#### Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": 20,
    "created_at": "2021-07-13T18:52:06.000000Z",
    "updated_at": "2021-08-20T08:05:49.000000Z",
    "country_id": 6,
    "name": "Federal Election 2021",
    "slug": "federal-election-2021",
    "published": true,
    "playable": true,
    "card_upload_id": 719,
    "voting_day": "2021-09-26",
    "playable_date": "2021-08-20 12:00:00",
    "translations_available": [
      "en",
      "de",
      "tr",
      "ru",
      "ar",
      "ku",
      "fa"
    ],
    "followup_link": "",
    "parties_participating": 36,
    "parties_not_participating": 3,
    "card": {
      "id": 719,
      "filename": "elections\/60ede0d5e8eaf\/federal-election-2021-G4q30.jpg",
      "filetype": "image\/jpeg",
      "width": 1600,
      "height": 900,
      "filesize": 111748,
      "alt_text": "",
      "created_at": "2021-07-13T18:52:06.000000Z",
      "updated_at": "2021-07-13T19:51:51.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/elections\/60ede0d5e8eaf\/federal-election-2021-G4q30.jpg"
    }
  },
  {
    "id": 21,
    "created_at": "2021-07-15T18:50:04.000000Z",
    "updated_at": "2021-08-20T08:07:01.000000Z",
    "country_id": 6,
    "name": "State election Berlin 2021",
    "slug": "state-election-berlin-2021",
    "published": true,
    "playable": true,
    "card_upload_id": 720,
    "voting_day": "2021-09-26",
    "playable_date": "2021-08-20 12:00:00",
    "translations_available": [
      "en",
      "de",
      "ru",
      "ku",
      "tr",
      "ar",
      "fa"
    ],
    "followup_link": "",
    "parties_participating": 32,
    "parties_not_participating": 2,
    "card": {
      "id": 720,
      "filename": "elections\/60f0835c1fb7f\/state-election-berlin-2021-raxRL.jpg",
      "filetype": "image\/jpeg",
      "width": 1600,
      "height": 900,
      "filesize": 132018,
      "alt_text": "",
      "created_at": "2021-07-15T18:50:04.000000Z",
      "updated_at": "2021-07-15T18:50:58.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/elections\/60f0835c1fb7f\/state-election-berlin-2021-raxRL.jpg"
    }
  },
  {
    "id": 22,
    "created_at": "2021-07-15T18:51:42.000000Z",
    "updated_at": "2021-08-20T08:06:02.000000Z",
    "country_id": 6,
    "name": "State election Mecklenburg-Vorpommern 2021",
    "slug": "state-election-mecklenburg-vorpommern-2021",
    "published": true,
    "playable": true,
    "card_upload_id": 721,
    "voting_day": "2021-09-26",
    "playable_date": "2021-08-20 12:00:00",
    "translations_available": [
      "en",
      "de",
      "tr",
      "ar",
      "ku",
      "ru",
      "fa"
    ],
    "followup_link": "",
    "parties_participating": 21,
    "parties_not_participating": 3,
    "card": {
      "id": 721,
      "filename": "elections\/60f083be26cc9\/state-election-meckpom-2021-1l81t.jpg",
      "filetype": "image\/jpeg",
      "width": 1600,
      "height": 900,
      "filesize": 146187,
      "alt_text": "",
      "created_at": "2021-07-15T18:51:42.000000Z",
      "updated_at": "2021-07-15T18:52:01.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/elections\/60f083be26cc9\/state-election-meckpom-2021-1l81t.jpg"
    }
  },
  {
    "id": 6,
    "created_at": "2021-05-27T09:33:12.000000Z",
    "updated_at": "2021-05-27T09:52:53.000000Z",
    "country_id": 6,
    "name": "State election Saxony-Anhalt 2021",
    "slug": "state-election-saxony-anhalt-2021",
    "published": true,
    "playable": true,
    "card_upload_id": 168,
    "voting_day": "2021-06-06",
    "playable_date": "2021-05-10 18:00:00",
    "translations_available": [
      "en",
      "de"
    ],
    "followup_link": "",
    "parties_participating": 19,
    "parties_not_participating": 0,
    "card": {
      "id": 168,
      "filename": "elections\/60af6755f0dc7\/en-1620714806643695048609a253662320-MRwNo.jpg",
      "filetype": "image\/jpeg",
      "width": 1600,
      "height": 900,
      "filesize": 86420,
      "alt_text": "",
      "created_at": "2021-05-27T09:33:12.000000Z",
      "updated_at": "2021-05-27T09:52:53.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/elections\/60af6755f0dc7\/en-1620714806643695048609a253662320-MRwNo.jpg"
    }
  }
]
```

### Fetch Election

Fetch a single election by slug or id

**URL** : `/election`

**Method** : `POST`

**Data**: 
```json
{
  "slug": "federal-election-2021"
}
```
OR

```json
{
  "id": 20
}
```

#### Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 20,
  "created_at": "2021-07-13T18:52:06.000000Z",
  "updated_at": "2021-08-20T08:05:49.000000Z",
  "country_id": 6,
  "name": "Federal Election 2021",
  "slug": "federal-election-2021",
  "published": true,
  "playable": true,
  "card_upload_id": 719,
  "voting_day": "2021-09-26",
  "playable_date": "2021-08-20 12:00:00",
  "translations_available": [
    "en",
    "de",
    "tr",
    "ru",
    "ar",
    "ku",
    "fa"
  ],
  "followup_link": "",
  "parties_participating": 36,
  "parties_not_participating": 3,
  "card": {
    "id": 719,
    "filename": "elections\/60ede0d5e8eaf\/federal-election-2021-G4q30.jpg",
    "filetype": "image\/jpeg",
    "width": 1600,
    "height": 900,
    "filesize": 111748,
    "alt_text": "",
    "created_at": "2021-07-13T18:52:06.000000Z",
    "updated_at": "2021-07-13T19:51:51.000000Z",
    "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/elections\/60ede0d5e8eaf\/federal-election-2021-G4q30.jpg"
  }
}
```

### Fetch Questions

Fetch questions for election

**URL** : `/questions`

**Method** : `POST`

**Data**: 
```json
{
  "slug": "federal-election-2021"
}
```
OR

```json
{
  "id": 20
}
```

#### Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": 607,
    "created_at": "2021-08-06T11:11:12.000000Z",
    "updated_at": "2021-08-19T10:44:53.000000Z",
    "election_id": 20,
    "thesis": "Should the minimum wage be increased to at least twelve euros?",
    "topic": "Social Policy",
    "video_url": "https:\/\/videos.voteswiper.org\/btw-2021\/en\/1\/index.m3u8",
    "explainer_text": "In Germany, the statutory minimum wage is the lowest hourly wage that employers can legally pay their employees. Since January 2020, the German minimum wage has been set at €9.50 nationally. There are currently plans to increase it to €10.45 by 1 July 2022. However, there are now some who are demanding that the minimum wage be increased to €12 with immediate effect. Opponents to the move fear that employee costs will become unaffordable for some employers, leading to job losses. Proponents of the policy believe that this fear is unfounded and argue that the higher minimum wage will improve the lives of many low earners.",
    "thumbnail_upload_id": 722,
    "sort_order": 1,
    "thumbnail": {
      "id": 722,
      "filename": "thumbnails\/610d18d030564\/ws-de-btw-2021-fb-01-HH8w0.jpg",
      "filetype": "image\/jpeg",
      "width": 600,
      "height": 338,
      "filesize": 27553,
      "alt_text": "",
      "created_at": "2021-08-06T11:11:12.000000Z",
      "updated_at": "2021-08-06T11:11:12.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/thumbnails\/610d18d030564\/ws-de-btw-2021-fb-01-HH8w0.jpg"
    }
  },
  {
    "id": 608,
    "created_at": "2021-08-06T11:12:08.000000Z",
    "updated_at": "2021-08-19T10:45:16.000000Z",
    "election_id": 20,
    "thesis": "Should the Nord Stream 2 gas pipeline be commissioned?",
    "topic": "Energy",
    "video_url": "https:\/\/videos.voteswiper.org\/btw-2021\/en\/5\/index.m3u8",
    "explainer_text": "Nord Stream 2 is a pipeline that, upon completion, will transport natural gas from Russia to Germany via the Baltic Sea. It is intended to help meet Germany’s energy demand as the country phases out nuclear and coal power. The project is almost finished and large sums have been invested in its construction, which is why some parties are in favour of commissioning the pipeline. Others argue that Germany will remain reliant on Russia for its energy needs, while Russia will be less dependent on Ukraine to transit its natural gas, thus allowing the country to exert pressure on Ukraine.",
    "thumbnail_upload_id": 723,
    "sort_order": 2,
    "thumbnail": {
      "id": 723,
      "filename": "thumbnails\/610d190857d1f\/ws-de-btw-2021-fb-05-PZeJa.jpg",
      "filetype": "image\/jpeg",
      "width": 600,
      "height": 338,
      "filesize": 21916,
      "alt_text": "",
      "created_at": "2021-08-06T11:12:08.000000Z",
      "updated_at": "2021-08-06T11:12:08.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/thumbnails\/610d190857d1f\/ws-de-btw-2021-fb-05-PZeJa.jpg"
    }
  }
]
```

### Fetch Parties

Fetches parties for an election as well as their answers.

**URL** : `/parties`

**Method** : `POST`

**Data**: 
```json
{
  "slug": "federal-election-2021"
}
```
OR

```json
{
  "id": 20
}
```

#### Success Response

The `answer` property has the values `0` (no answer), `1` (no) and `2` (yes).

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": 23,
    "country_id": 6,
    "name": "AfD",
    "slug": "afd",
    "full_name": "Alternative für Deutschland",
    "url": "https:\/\/www.afd.de\/",
    "logo_upload_id": 210,
    "created_at": "2021-05-27T09:34:52.000000Z",
    "updated_at": "2021-08-21T14:59:35.000000Z",
    "pivot": {
      "election_id": 20,
      "party_id": 23,
      "playable": true,
      "published": true,
      "program_upload_id": 761,
      "program_link": null,
      "id": 269,
      "created_at": "2021-08-15T07:47:19.000000Z",
      "updated_at": "2021-08-18T13:00:20.000000Z",
      "answers": [
        {
          "id": 8939,
          "electionparty_id": 269,
          "question_id": 607,
          "answer": 1,
          "reason": "Der gesetzliche Mindestlohn entspricht dem Wesen der sozialen Marktwirtschaft. Er korrigiert im Bereich der Entlohnung die Position der Niedriglohnempfänger als schwache Marktteilnehmer gegenüber den Interessen der Arbeitgeber als vergleichsweise starke Marktteilnehmer. Die Mindestlohnfindung obliegt aber der Mindestlohnkommission, nicht dem Gesetzgeber.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8940,
          "electionparty_id": 269,
          "question_id": 608,
          "answer": 2,
          "reason": "Die AfD unterstützt den Ausbau der Pipeline ,,Nord Stream 2\". Durch deren Anbindung an Deutschland kann unseren Bürgern ein kostengünstiger Primärenergieträger zur Verfügung gestellt werden.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8941,
          "electionparty_id": 269,
          "question_id": 609,
          "answer": 1,
          "reason": "Eine bessere Vergleichbarkeit und bundesweit gültige Standards für das Abitur sind notwendig. Allerdings hat der Bund weder die verfassungsrechtliche Zuständigkeit noch die fachliche Kompetenz, ein bundesweites Einheitsabitur einzuführen. Wir befürchten außerdem in diesem Zusammenhang eine Absenkung des Niveaus.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8942,
          "electionparty_id": 269,
          "question_id": 610,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8943,
          "electionparty_id": 269,
          "question_id": 611,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8944,
          "electionparty_id": 269,
          "question_id": 612,
          "answer": 1,
          "reason": "Trotz der gesetzlichen Verpflichtung, Arbeitsplätze für behinderte Menschen vorzuhalten, ist die Zahl der arbeitslosen schwerbehinderten Menschen deutlich zu hoch. Um echte Teilhabe für behinderte Menschen am Arbeitsleben zu verwirklichen, fordert die AfD die Schaffung von Anreizen in Form eines Bonussystems für alle Arbeitgeber für die Einrichtung von mehr Arbeitsplätzen für Menschen mit Behinderung, gekoppelt mit einer fairen Entlohnung.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8945,
          "electionparty_id": 269,
          "question_id": 613,
          "answer": 2,
          "reason": "Die AfD fordert Volksentscheide nach Schweizer Modell auch für Deutschland. Die uneingeschränkte Volkssouveränität in ihrer fast 200 Jahre bewährten und optimierten Gestaltung hat dem eidgenössischen Bundesstaat eine fortwährende Spitzenstellung in  Wohlstand, Frieden und Freiheit gewährleistet.Das Volk soll die Möglichkeit erhalten, Gesetzesinitiativen einzubringen und per Volksabstimmung zu beschließen. Hierbei soll es jenseits des Art. 79 Abs. 3 GG keine thematischen Beschränkungen geben. Wir vertrauen nicht mehr darauf, dass Regierungen und Parlamente zu Währungskrisen, Migration, \nIslamisierung oder zur Energiewende tragfähige Lösungen finden. Das Volk als Souverän muss in direkter Mitbestimmung Träger solcher schicksalhaften Entscheidungen sein.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8946,
          "electionparty_id": 269,
          "question_id": 614,
          "answer": 1,
          "reason": "Eine Herabsetzung des Wahlalters auf 16 lehnt die AfD ab. Aus gutem Grund sind junge Menschen vor dem 18. Lebensjahr von den meisten bürgerlichen Pflichten befreit. Zudem sind sie beschränkt geschäftsfähig. Dementsprechend sollten sie auch das vornehmste Recht eines Bürgers, das Wahlrecht, erst dann erhalten, wenn sie diese Pflichten gegenüber der Gemeinschaft erfüllen müssen. Es darf keine Rechte ohne Pflichten geben.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8947,
          "electionparty_id": 269,
          "question_id": 615,
          "answer": 1,
          "reason": "Für medizinische Indikationen sollen unter ärztlicher Aufsicht Präparate mit dem Hauptwirkstoff zur Verfügung stehen. Wir befürworten den Ausbau der suchtpsychiatrischen Versorgung für eine dauerhafte Abstinenz von Drogen.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8948,
          "electionparty_id": 269,
          "question_id": 616,
          "answer": 2,
          "reason": "Wir wollen das EEG ersatzlos streichen und die Vorrangeinspeisung beenden. Die sichere Energieversorgung eines Industrielandes erfordert einen breiten Energiemix. Eine komplette Umstellung unserer Energieversorgung auf volatile „erneuerbare“ Energielieferanten ist unökologisch unrealistisch und daher abzulehnen",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8949,
          "electionparty_id": 269,
          "question_id": 617,
          "answer": 1,
          "reason": "Die Laufzeit der in Deutschland noch verbliebenen sechs aktiven Kernkraftwerke muss sich nach der technischen Nutzungsdauer und ökonomischen Kriterien richten. Eine Abschaltung aus anderen Gründen lehnen wir ab. Deutsche Kernkraftwerke gehören zu den sichersten der \nWelt. ",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8950,
          "electionparty_id": 269,
          "question_id": 618,
          "answer": 1,
          "reason": "Gesicherte und günstige Energieversorgung ist eine der Voraussetzungen von Wohlstand, Sicherheit und Gesundheit. Eine komplette Umstellung unserer Versorgung auf volatile ,,erneuerbare\" Energielieferanten ist unökologisch und unrealistisch - und daher abzulehnen. Die AfD setzt sich für die Verstromung von Braun- und Steinkohle als grundlast- und regelfähige Energiequellen ein. Deutschland hat die weltweit saubersten und effizientesten Kraftwerke. Daher lehnen wir die Ausstiegspläne insgesamt ab.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8951,
          "electionparty_id": 269,
          "question_id": 619,
          "answer": 1,
          "reason": "Die Vergemeinschaftung der europäischen Außen- und Sicherheitspolitik (GASP) und den europäischen Auswärtigen Dienst lehnt die AfD ab.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8952,
          "electionparty_id": 269,
          "question_id": 620,
          "answer": 2,
          "reason": "Die Vehemenz, mit welcher die Europäische Union die Transformation zum planwirtschaftlichen Superstaat in den letzten Jahren vorangetrieben hat, hat uns zu der Erkenntnis gebracht, dass sich unsere grundlegenden Reformansätze in dieser EU nicht verwirklichen lassen. Wir halten einen Austritt Deutschlands aus der Europäischen Union und die Gründung einer neuen europäischen Wirtschafts- und Interessengemeinschaft für notwendig.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8953,
          "electionparty_id": 269,
          "question_id": 621,
          "answer": 1,
          "reason": "Die EU maßt sich heute an, entgegen dem Wortlaut der EU-Verträge eigene Schulden aufzunehmen. Dabei werden die Mittel durch Neuverschuldung beschafft und anschließend von EU-Bürokraten über unzählige, zumeist ideologisch motivierte Projekte nach Gutsherrenart ausgegeben. Haftung und Tilgung verbleiben jedoch bei den Nationalstaaten. Die AfD fordert eine sofortige Einstellung jeglicher Kreditaufnahme der EU, die zu Lasten künftiger deutscher Generationen gehen würde.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8954,
          "electionparty_id": 269,
          "question_id": 622,
          "answer": 1,
          "reason": "Die EU maßt sich heute an, entgegen dem Wortlaut der EU-Verträge eigene Schulden aufzunehmen. Dabei werden die Mittel durch Neuverschuldung beschafft und anschließend von EU-Bürokraten über unzählige, zumeist ideologisch motivierte Projekte nach Gutsherrenart ausgegeben. Haftung und Tilgung verbleiben jedoch bei den Nationalstaaten. Die AfD fordert eine sofortige Einstellung jeglicher Kreditaufnahme der EU, die zu Lasten künftiger deutscher Generationen gehen würde.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8955,
          "electionparty_id": 269,
          "question_id": 623,
          "answer": 2,
          "reason": "In Deutschland wird man, etwa im krassen Unterschied zur Schweiz, mit leicht überdurchschnittlichem Einkommen bereits zu Teilen mit dem Spitzensteuersatz belastet. Grundsätzlich ist es das Ziel der AfD, die Steuer- und Abgabenbelastung in Deutschland deutlich zu senken. Laut OECD wird Deutschland weltweit nur noch von Belgien übertroffen. Es ist ein Gebot elementarer Gerechtigkeit, diese Belastung durch eine Entlastung anzupassen.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8956,
          "electionparty_id": 269,
          "question_id": 624,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8957,
          "electionparty_id": 269,
          "question_id": 625,
          "answer": 1,
          "reason": "Ehepaare werden steuerlich so behandelt, wie dies nach Art. 6 GG geboten ist. Danach ,,stehen Ehe und Familie unter dem besonderen Schutz des Staates\". Soweit Eheleute ihren Unterhalt selbst besorgen, sind sie - mit oder ohne Kinder - eine Wirtschafts- und Erwerbsgemeinschaft und dies, solange sie verheiratet sind. Ihr Gesamteinkommen ist daher vor Steuern gleichmäßig aufzuteilen, so das Bundesverfassungsgericht gegen\neine davon abweichende Praxis der Gesetzgebung bereits in den 50er-Jahren.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8958,
          "electionparty_id": 269,
          "question_id": 626,
          "answer": 1,
          "reason": "Der Prozess des Sterbens ist durch die bewährte Palliativmedizin und eine passive Sterbehilfe zu begleiten.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8959,
          "electionparty_id": 269,
          "question_id": 627,
          "answer": 1,
          "reason": "Für die AfD müssen Abtreibungen die Ausnahme und der letzte Ausweg bei einer ungewollten Schwangerschaft sein. Das Leben eines Kindes muss sorgfältig mit den Bedürfnissen der Mutter abgewogen werden. Es darf nicht leichtfertig vor der Geburt beendet werden. Aus diesem Grund muss alles vermieden werden, was Abtreibungen als normale ärztliche Dienstleistung darstellt. Dazu zählen insbesondere Werbung bzw. ,,Informationen zum Leistungsspektrum eines Arztes\".",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8960,
          "electionparty_id": 269,
          "question_id": 628,
          "answer": 1,
          "reason": "Der Wettbewerb zwischen GKV und PKV um Versicherte oberhalb der Beitragsbemessungsgrenze führt zu attraktiven Leistungsangeboten bei der GKV, welches allen gesetzlich Versicherten zugutekommt. Ohne Wettbewerb ist zu befürchten, dass das Leistungsangebot der GKV bei entsprechender Kassenlage deutlich abgesenkt wird. Die \"GKV-Einheitskasse\" könnte sich zur \"Holzklasse\" entwickeln.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8961,
          "electionparty_id": 269,
          "question_id": 629,
          "answer": 1,
          "reason": "Die sogenannte ,,gendergerechte Sprache\" ist eine groteske Verunstaltung der deutschen Sprache. Sie schafft keine Gleichberechtigung. Sprache darf kein Spielball ideologischer Interessen sein. Wir lehnen daher insbesondere die sogenannte ,,gendergerechte Sprache\" ab und sprechen uns gegen jegliche Verpflichtung aus, sie verwenden zu müssen.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8962,
          "electionparty_id": 269,
          "question_id": 630,
          "answer": 2,
          "reason": "Die AfD tritt für die Wiedereinsetzung der Wehrpflicht ein. Sie soll um ein Gemeinschaftsdienstjahr ergänzt werden. Dieses soll Anwendung finden für Frauen und für Männer, die sich nicht für den Wehrdienst entscheiden. Der Gemeinschaftsdienst soll in den Bereichen Pflege, Feuerwehr oder Technisches Hilfswerk geleistet werden.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8963,
          "electionparty_id": 269,
          "question_id": 631,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8964,
          "electionparty_id": 269,
          "question_id": 632,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8965,
          "electionparty_id": 269,
          "question_id": 633,
          "answer": 1,
          "reason": "Das öffentlich-rechtliche Rundfunksystem ist überholt. Die Rundfunkstaatsverträge sind in jedem Bundesland zu kündigen, um eine grundlegende Reform zu ermöglichen. Am Ende soll ein stark reduzierter Anbieter stehen, der ca. ein Zehntel des bisherigen Umfangs haben soll. Dieser „Grundfunk“ hat nur die Aufgabe, die Bürger flächendeckend mit neutralen \nInhalten aus den Sparten Information, Kultur und Bildung zu versorgen. Wichtig bleiben regionale Inhalte – ein schlanker „Heimatfunk“ als Schaufenster der Regionen.\nZwangsbeiträge und Werbung entfallen. Die Finanzierung erfolgt durch eine Abgabe, die insbesondere Technologiekonzerne, die audiovisuelle Inhalte verbreiten, sowie Video-Streaming-Dienste zu leisten haben. Diese dominieren den deutschen Markt, ohne dafür in \nangemessener Weise Steuern oder Abgaben zu zahlen.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8966,
          "electionparty_id": 269,
          "question_id": 634,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8967,
          "electionparty_id": 269,
          "question_id": 635,
          "answer": 2,
          "reason": "Der erhebliche Anteil von Ausländern insbesondere bei der Gewalt- und Drogenkriminalität, aber auch bei öffentlichen Unruhen, führt derzeit viel zu selten zu ausländerrechtlichen Maßnahmen. Ausländische Kriminelle können sich sehr häufig auf Abschiebungshindernisse berufen und sind auf diese Weise von Abschiebung verschont. Wir fordern daher (a) die Erleichterung der Ausweisung, insbesondere die Wiedereinführung der zwingenden Ausweisung auch schon bei geringfügiger Kriminalität, (b) die Ausweisung \nbereits durch die Strafgerichte, (c) die Ermöglichung der Unterbringung nicht abgeschobener Krimineller im Ausland, (d) die Schaffung der Möglichkeit, Gefährder, insbesondere Terroristen, so lange in Haft zu nehmen, wie sie im Inland sind und von ihnen eine erhebliche \nGefahr für die Allgemeinheit ausgeht. ",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8968,
          "electionparty_id": 269,
          "question_id": 636,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8969,
          "electionparty_id": 269,
          "question_id": 637,
          "answer": 1,
          "reason": "Jegliche Form der CO2-Besteuerung ist abzuschaffen. Das Ziel der Bundesregierung, die CO2-Emissionen faktisch auf null zu senken, führt zu einem radikalen Umbau von Industrie und Gesellschaft („Die Große Transformation“ \/ „The Great Reset“) und bedroht unsere \nFreiheit in einem immer beängstigenderen Ausmaß. Die AfD lehnt dieses Ziel und den damit verbundenen Gesellschaftsumbau ab.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8970,
          "electionparty_id": 269,
          "question_id": 638,
          "answer": 1,
          "reason": " Die heutige einseitige Bevorzugung von Elektromobilität ist auf Grund mangelnder Stromkapazitäten und der globalen Umweltbelastung bei der Batterieproduktion sofort zu stoppen. Ob der Verbrennungsmotor eines Tages durch andere Antriebsformen abgelöst wird oder weiter existiert, muss eine Frage des technischen Fortschritts sowie des \nMarktes werden und darf nicht auf der Verbotspolitik der EU basieren. Wenn die bestehende, realitätsfremde EU-CO2-Reduktionsgesetzgebung im Verkehrssektor nicht verhindert werden kann, sind synthetische Kraftstoffe als zukunftsfähiger Treibstoff für Verbrennungsmotoren zu berücksichtigen. Fahrzeuge mit Verbrennungsmotor, \nwelche mit synthetischem Kraftstoff angetrieben werden, müssen hinsichtlich Ihrer Abgabenlast gegenüber elektrisch angetriebenen Fahrzeugen eine Gleichbehandlung erfahren. Dies gilt sowohl für den Energieträger selbst als auch für das Fahrzeug insgesamt.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8971,
          "electionparty_id": 269,
          "question_id": 639,
          "answer": 1,
          "reason": "Die AfD lehnt ein generelles Tempolimit auf Bundesautobahnen strikt ab. Starre Tempolimits müssen regelmäßig überprüft werden und im Fall der Unbegründetheit wegfallen. Temporär sind flexible, situationsgerechte Streckenbeeinflussungsanlagen die Alternative.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8972,
          "electionparty_id": 269,
          "question_id": 640,
          "answer": 1,
          "reason": "Die AfD steht für ein ausgewogenes Mietrecht und lehnt staatliche Überregulierungen sowie \nInvestitionshemmnisse wie die Mietpreisbremse oder den Mietendeckel ab.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8973,
          "electionparty_id": 269,
          "question_id": 641,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        },
        {
          "id": 8974,
          "electionparty_id": 269,
          "question_id": 642,
          "answer": 2,
          "reason": "Die Bundeswehr befindet sich in einem desolaten Zustand. Es fehlt an Personal und funktionsfähiger Ausrüstung. Die deutschen Streitkräfte sind so zu reformieren, dass ihre Einsatzbereitschaft im Rahmen der Landes- und Bündnisverteidigung gewährleistet ist. Neuen hybriden Bedrohungen und Cyberattacken muss angemessen begegnet werden. Die AfD steht zu den Zusagen gegenüber der NATO. Um ihren Auftrag wieder erfüllen zu können, ist die Bundeswehr auf eine verlässliche Finanzierung angewiesen.",
          "created_at": "2021-08-17T21:24:43.000000Z",
          "updated_at": "2021-08-17T21:24:43.000000Z"
        }
      ],
      "program": {
        "id": 761,
        "filename": "programs\/6118c686ea1a5\/20210611-afd-programm-2021-jEr34.pdf",
        "filetype": "application\/pdf",
        "width": 0,
        "height": 0,
        "filesize": 2282367,
        "alt_text": "",
        "created_at": "2021-08-15T07:47:19.000000Z",
        "updated_at": "2021-08-15T07:47:19.000000Z",
        "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/programs\/6118c686ea1a5\/20210611-afd-programm-2021-jEr34.pdf"
      }
    },
    "logo": {
      "id": 210,
      "filename": "parties\/60af67baa7beb\/1550957884-15509578843554155335c71bd3c28960-k1xsv.png",
      "filetype": "image\/png",
      "width": 800,
      "height": 368,
      "filesize": 85821,
      "alt_text": "",
      "created_at": "2021-05-27T09:34:52.000000Z",
      "updated_at": "2021-05-27T09:34:52.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/parties\/60af67baa7beb\/1550957884-15509578843554155335c71bd3c28960-k1xsv.png"
    }
  },
  {
    "id": 39,
    "country_id": 6,
    "name": "Bayernpartei",
    "slug": "bayernpartei",
    "full_name": "Bayernpartei",
    "url": "https:\/\/bayernpartei.de\/",
    "logo_upload_id": 257,
    "created_at": "2021-05-27T09:36:46.000000Z",
    "updated_at": "2021-08-21T14:59:51.000000Z",
    "pivot": {
      "election_id": 20,
      "party_id": 39,
      "playable": true,
      "published": true,
      "program_upload_id": 768,
      "program_link": null,
      "id": 281,
      "created_at": "2021-08-15T08:02:18.000000Z",
      "updated_at": "2021-08-18T13:01:36.000000Z",
      "answers": [
        {
          "id": 8831,
          "electionparty_id": 281,
          "question_id": 607,
          "answer": 1,
          "reason": "Eine moderate Erhöhung Mindestlohn ist sinnvoll, aber nicht in dieser Höhe.",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8832,
          "electionparty_id": 281,
          "question_id": 608,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8833,
          "electionparty_id": 281,
          "question_id": 609,
          "answer": 1,
          "reason": "Schulpolitik ist Ländersache. Ein Zentralabitur würde die Kernsubstanz des Föderalismus in Frage stellen.",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8834,
          "electionparty_id": 281,
          "question_id": 610,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8835,
          "electionparty_id": 281,
          "question_id": 611,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8836,
          "electionparty_id": 281,
          "question_id": 612,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8837,
          "electionparty_id": 281,
          "question_id": 613,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8838,
          "electionparty_id": 281,
          "question_id": 614,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8839,
          "electionparty_id": 281,
          "question_id": 615,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8840,
          "electionparty_id": 281,
          "question_id": 616,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8841,
          "electionparty_id": 281,
          "question_id": 617,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8842,
          "electionparty_id": 281,
          "question_id": 618,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8843,
          "electionparty_id": 281,
          "question_id": 619,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8844,
          "electionparty_id": 281,
          "question_id": 620,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8845,
          "electionparty_id": 281,
          "question_id": 621,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8846,
          "electionparty_id": 281,
          "question_id": 622,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8847,
          "electionparty_id": 281,
          "question_id": 623,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8848,
          "electionparty_id": 281,
          "question_id": 624,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8849,
          "electionparty_id": 281,
          "question_id": 625,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8850,
          "electionparty_id": 281,
          "question_id": 626,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8851,
          "electionparty_id": 281,
          "question_id": 627,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8852,
          "electionparty_id": 281,
          "question_id": 628,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8853,
          "electionparty_id": 281,
          "question_id": 629,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8854,
          "electionparty_id": 281,
          "question_id": 630,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8855,
          "electionparty_id": 281,
          "question_id": 631,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8856,
          "electionparty_id": 281,
          "question_id": 632,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8857,
          "electionparty_id": 281,
          "question_id": 633,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8858,
          "electionparty_id": 281,
          "question_id": 634,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8859,
          "electionparty_id": 281,
          "question_id": 635,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8860,
          "electionparty_id": 281,
          "question_id": 636,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8861,
          "electionparty_id": 281,
          "question_id": 637,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8862,
          "electionparty_id": 281,
          "question_id": 638,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8863,
          "electionparty_id": 281,
          "question_id": 639,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8864,
          "electionparty_id": 281,
          "question_id": 640,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8865,
          "electionparty_id": 281,
          "question_id": 641,
          "answer": 1,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        },
        {
          "id": 8866,
          "electionparty_id": 281,
          "question_id": 642,
          "answer": 2,
          "reason": "",
          "created_at": "2021-08-17T21:24:42.000000Z",
          "updated_at": "2021-08-17T21:24:42.000000Z"
        }
      ],
      "program": {
        "id": 768,
        "filename": "programs\/6118ca0a9f771\/bundestagswahlprogramms-2021-der-bayernpartei-jFNH8.pdf",
        "filetype": "application\/pdf",
        "width": 0,
        "height": 0,
        "filesize": 122070,
        "alt_text": "",
        "created_at": "2021-08-15T08:02:18.000000Z",
        "updated_at": "2021-08-15T08:02:18.000000Z",
        "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/programs\/6118ca0a9f771\/bundestagswahlprogramms-2021-der-bayernpartei-jFNH8.pdf"
      }
    },
    "logo": {
      "id": 257,
      "filename": "parties\/60af6829ba1fc\/1550957916-15509579164887324895c71bd5c91b6b-PzM2W.png",
      "filetype": "image\/png",
      "width": 800,
      "height": 1114,
      "filesize": 453971,
      "alt_text": "",
      "created_at": "2021-05-27T09:36:46.000000Z",
      "updated_at": "2021-05-27T09:36:46.000000Z",
      "public_link": "https:\/\/voteswiper-assets-prod.fra1.digitaloceanspaces.com\/parties\/60af6829ba1fc\/1550957916-15509579164887324895c71bd5c91b6b-PzM2W.png"
    }
  }
]
```

