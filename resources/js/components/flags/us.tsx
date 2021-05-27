import React from 'react';

export const FlagUS: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 28 20" {...props}>
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="e">
                    <stop stopColor="#FFF" offset="0%" />
                    <stop stopColor="#F0F0F0" offset="100%" />
                </linearGradient>
                <filter
                    x="-5.4%"
                    y="-7.5%"
                    width="110.7%"
                    height="130%"
                    filterUnits="objectBoundingBox"
                    id="c"
                >
                    <feOffset
                        dy="1"
                        in="SourceAlpha"
                        result="shadowOffsetOuter1"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        in="shadowOffsetOuter1"
                    />
                </filter>
                <rect id="a" x="0" y="0" width="28" height="20" rx="2" />
                <path
                    d="M10 6.67A.67.67 0 1110 8a.67.67 0 010-1.33zm-2.67 0a.67.67 0 110 1.33.67.67 0 010-1.33zm-2.66 0a.67.67 0 110 1.33.67.67 0 010-1.33zM2 6.67A.67.67 0 112 8a.67.67 0 010-1.33zm1.33-1.34a.67.67 0 110 1.34.67.67 0 010-1.34zm2.67 0a.67.67 0 110 1.34.67.67 0 010-1.34zm2.67 0a.67.67 0 110 1.34.67.67 0 010-1.34zM10 4a.67.67 0 110 1.33A.67.67 0 0110 4zM7.33 4a.67.67 0 110 1.33.67.67 0 010-1.33zM4.67 4a.67.67 0 110 1.33.67.67 0 010-1.33zM2 4a.67.67 0 110 1.33A.67.67 0 012 4zm1.33-1.33a.67.67 0 110 1.33.67.67 0 010-1.33zm2.67 0A.67.67 0 116 4a.67.67 0 010-1.33zm2.67 0a.67.67 0 110 1.33.67.67 0 010-1.33zM2 1.33a.67.67 0 110 1.34.67.67 0 010-1.34zm2.67 0a.67.67 0 110 1.34.67.67 0 010-1.34zm2.66 0a.67.67 0 110 1.34.67.67 0 010-1.34zm2.67 0a.67.67 0 110 1.34.67.67 0 010-1.34z"
                    id="d"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                </mask>
                <use fill="#FFF" xlinkHref="#a" />
                <path
                    d="M28 18.67V20H0v-1.33h28zM28 16v1.33H0V16h28zm0-2.67v1.34H0v-1.34h28zm0-2.66V12H0v-1.33h28zM28 8v1.33H0V8h28zm0-2.67v1.34H0V5.33h28zm0-2.66V4H0V2.67h28zM28 0v1.33H0V0h28z"
                    fill="#D02F44"
                    mask="url(#b)"
                />
                <path fill="#46467F" mask="url(#b)" d="M0 0h12v9.33H0z" />
                <g mask="url(#b)">
                    <use fill="#000" filter="url(#c)" xlinkHref="#d" />
                    <use fill="url(#e)" xlinkHref="#d" />
                </g>
            </g>
        </svg>
    );
};
