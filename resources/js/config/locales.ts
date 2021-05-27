import React from 'react';
import { FlagDE } from '../components/flags/de';
import { FlagFI } from '../components/flags/fi';
import { FlagFR } from '../components/flags/fr';
import { FlagSV } from '../components/flags/sv';
import { FlagUS } from '../components/flags/us';

const locales: {
    [key: string]: {
        label: string;
        flag: React.FC<React.SVGProps<SVGSVGElement>>;
    };
} = {
    de: {
        label: 'German',
        flag: FlagDE,
    },
    fi: {
        label: 'Finnish',
        flag: FlagFI,
    },
    fr: {
        label: 'French',
        flag: FlagFR,
    },
    sv: {
        label: 'Swedish',
        flag: FlagSV,
    },
    en: {
        label: 'English',
        flag: FlagUS,
    },
};

export default locales;
