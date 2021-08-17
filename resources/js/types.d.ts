interface InertiaPage extends React.FC {
    layout?: (page: React.ReactChildren) => React.ReactElement;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface GlobalProps {
    locale: string;
    locales: string[];
    user: User;
}

interface TranslatedColumn {
    [locale: string]: string;
}

interface Country {
    id: number;
    name: string;
    country_code: string;
    language_code: string;
    published: boolean;
    slug: string;
}

interface CountryWithTranslations {
    id: number;
    name: TranslatedColumn;
    country_code: string;
    language_code: string;
    published: boolean;
    slug: TranslatedColumn;
}

interface Upload {
    id: number;
    filename: string;
    filesize: number;
    filetype: string;
    width: number | null;
    height: number | null;
    alt_text: string | null;
}

interface Answer {
    id: number;
    reason: string;
    answer: number;
    question_id: number;
}

interface ElectionPartyPivot {
    published: boolean;
    playable: boolean;
    program_upload_id: number;
    program_link: string;
    program: Upload;
    answers: Answer[];
    answers_count?: number;
}

interface Party {
    id: number;
    country_id: number;
    country: Country;
    name: string;
    slug: string;
    full_name: string;
    url: string | null;
    logo_upload_id: number;
    logo: Upload;
    pivot: ElectionPartyPivot;
}

interface Question {
    id: number;
    thesis: string;
    topic: string;
    video_url: string | null;
    explainer_text: string | null;
    thumbnail_upload_id: number;
    thumbnail: Upload;
}

interface Election {
    id: number;
    country_id: number;
    country: Country;
    name: string;
    followup_link: string;
    slug: string;
    card_upload_id: number;
    card: Upload;
    published: boolean;
    playable: boolean;
    voting_day: string;
    playable_date: string;
    translations_available: string[];
    questions_count?: number;
    parties_count?: number;
}

interface ElectionWithQuestions extends Election {
    questions: Question[];
}

interface ElectionWithParties extends Election {
    parties: Party[];
}
