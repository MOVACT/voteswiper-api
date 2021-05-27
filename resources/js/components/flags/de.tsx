import React from 'react';

export const FlagDE: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 28 20" {...props}>
            <defs>
                <rect id="a" x="0" y="0" width="28" height="20" rx="2" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <use fill="#FFF" xlinkHref="#a" />
                <path fill="#262626" mask="url(#b)" d="M0 0h28v6.67H0z" />
                <path fill="#F01515" mask="url(#b)" d="M0 6.67h28v7H0z" />
                <path fill="#FFD521" mask="url(#b)" d="M0 13.33h28V20H0z" />
            </g>
        </svg>
    );
};
