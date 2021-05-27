import React from 'react';

export const FlagFR: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 28 20" {...props}>
            <defs>
                <rect id="a" x="0" y="0" width="28" height="20" rx="2" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <rect
                    fill="#fff"
                    x=".25"
                    y=".25"
                    width="27.5"
                    height="19.5"
                    rx="2"
                />
                <path fill="#F44653" mask="url(#b)" d="M18.67 0H28v20h-9.33z" />
                <path fill="#1035BB" mask="url(#b)" d="M0 0h9.33v20H0z" />
            </g>
        </svg>
    );
};
