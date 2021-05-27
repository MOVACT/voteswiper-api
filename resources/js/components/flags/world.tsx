import React from 'react';

export const FlagWorld: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 28 20">
            <defs>
                <rect id="a" x="0" y="0" width="28" height="20" rx="2" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <use fill="#FFF" xlinkHref="#a" />
                <path fill="#19BFBF" mask="url(#b)" d="M0 0h28v20H0z" />
                <path
                    d="M14 2.67a7.33 7.33 0 110 14.66 7.33 7.33 0 010-14.66zm1.99 8H12c.1 2.25.69 4.23 1.6 5.32a6.77 6.77 0 00.77 0c.92-1.09 1.5-3.07 1.6-5.32zm3.97 0h-2.64a12.49 12.49 0 01-1.1 4.9 6 6 0 003.74-4.9zm-9.28 0H8.04a6 6 0 003.74 4.9 12.47 12.47 0 01-1.1-4.9zm1.1-6.25l-.12.05a6 6 0 00-3.62 4.86h2.64c.07-1.86.45-3.58 1.1-4.9zm4.44 0l.04.1c.62 1.3.99 3 1.06 4.81h2.64a6 6 0 00-3.74-4.9zM14 4l-.39.01c-.91 1.09-1.5 3.07-1.6 5.32H16c-.1-2.25-.69-4.23-1.6-5.32L14 4z"
                    fill="#FFF"
                    mask="url(#b)"
                />
            </g>
        </svg>
    );
};
