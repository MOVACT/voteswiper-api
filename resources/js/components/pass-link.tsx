import { router } from '@inertiajs/react';
import React from 'react';

interface Props {
    href: string;
}

export const PassLink: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    href,
}) => {
    const visit = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
        event.preventDefault();
        router.visit(href);
    };

    return React.cloneElement(
        children as React.DetailedReactHTMLElement<never, HTMLElement>,
        {
            onClick: visit,
            href,
        }
    );
};
