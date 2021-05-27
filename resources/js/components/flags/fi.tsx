import React from 'react';

export const FlagFI: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
                    fill="#ffffff"
                    x=".25"
                    y=".25"
                    width="27.5"
                    height="19.5"
                    rx="2"
                />
                <path
                    fill="#0848A6"
                    mask="url(#b)"
                    d="M-1.33 12H8v9.33h4V12h17.33V8H12v-9.33H8V8h-9.33z"
                />
            </g>
        </svg>
    );
};
