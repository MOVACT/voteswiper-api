import React from 'react';

export const FlagSV: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
                <path fill="#157CBB" mask="url(#b)" d="M0 0h28v20H0z" />
                <path
                    fill="#FFD34D"
                    mask="url(#b)"
                    d="M0 12h8v8h4v-8h16V8H12V0H8v8H0z"
                />
            </g>
        </svg>
    );
};
