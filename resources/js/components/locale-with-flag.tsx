import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';
import locales from '../config/locales';
import { FlagWorld } from './flags/world';

interface Props {
    locale?: string;
}

export const LocaleWithFlag: React.FC<Props> = ({ locale }) => {
    const { props } = usePage<Page<GlobalProps>>();

    const localeToShow = locale ? locale : props.locale;

    const renderComponent = (
        Component: React.FC<React.SVGProps<SVGSVGElement>>,
        label: string
    ): React.ReactElement => {
        return (
            <div className="d-flex">
                <div>
                    <Component className="me-3" height="auto" width={26} />
                </div>
                <h4 className="card-title">{label}</h4>
            </div>
        );
    };

    if (locales[localeToShow]) {
        return renderComponent(
            locales[localeToShow].flag,
            locales[localeToShow].label
        );
    }

    return renderComponent(FlagWorld, localeToShow);
};
