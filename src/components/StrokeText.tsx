import React from 'react';

interface Props {
    text: string;
}

const StrokeText: React.FC<Props> = ({ text }) => {
    return (
        <svg width={"100%"} height={90}>
            <defs>
                <linearGradient id="fill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ffff88', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#ffbb00', stopOpacity: 0.8}} />
                </linearGradient>
                <linearGradient id="gradient-top-bottom" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#eaeaea80', stopOpacity: 0}} />
                    <stop offset="100%" style={{stopColor: '#eaeaea80', stopOpacity: 1}}/>
                </linearGradient>
            </defs>
            <text x="50%" y="50%" style={{fontSize: 50, StrokeWidth: 3,textAnchor: 'middle'}}
                  fill="url(#fill-gradient)"
                  stroke="url(#gradient-top-bottom)">
                {text}
            </text>
        </svg>
    );
};

export default StrokeText;