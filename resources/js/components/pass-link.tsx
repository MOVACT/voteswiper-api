import { Inertia } from '@inertiajs/inertia';
import React from 'react';

interface Props {
    href: string;
}

export const PassLink: React.FC<Props> = ({ children, href }) => {
    const visit = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
        event.preventDefault();
        Inertia.visit(href);
    };

    return React.cloneElement(
        children as React.DetailedReactHTMLElement<never, HTMLElement>,
        {
            onClick: visit,
            href,
        }
    );
};
