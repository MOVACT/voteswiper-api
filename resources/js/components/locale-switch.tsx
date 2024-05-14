import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { IconLanguage } from '@tabler/icons-react';
import cn from 'classnames';
import React from 'react';
import { useClickAway } from 'react-use';
import { route } from 'ziggy-js';
import localeStrings from '../config/locales';

interface Props {
    locales: string[];
}

export const LocaleSwitch: React.FC<Props> = ({ locales }) => {
    const $dropdownEl = React.useRef<HTMLDivElement>(null);
    const { props } = usePage<Page<GlobalProps>>();
    const [open, setOpen] = React.useState(false);
    useClickAway($dropdownEl, () => {
        setOpen(false);
    });
    const currentLocale = props.locale;

    return (
        <>
            <div className="dropdown" ref={$dropdownEl}>
                <button
                    type="button"
                    className="btn btn-red btn-sm"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <IconLanguage size={12} />
                    {localeStrings[currentLocale].label}
                </button>
                <div
                    className={cn(
                        'dropdown-menu bg-dark text-white',
                        open && 'show'
                    )}
                >
                    {locales.map((locale) => {
                        if (locale === currentLocale) return;
                        return (
                            <a
                                key={locale}
                                className="dropdown-item"
                                href={route('admin.locale', { key: locale })}
                            >
                                {localeStrings[locale].label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
