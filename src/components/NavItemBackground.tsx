import React from 'react';

interface BGProps {
    show: string;
    color: string;
}

const NavItemBg: React.FC<BGProps> = ({ show ,color}) => (
    <div className={'background-100'} style={{display: show, transform: `translateY(3px)`}}>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="230" height="30" fill="none"
             stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="icon icon-tabler icons-tabler-outline icon-tabler-home">
            <path stroke="none" d="M0 0h230v60H0z" fill="none"/>
            <path d="M130 1 h50 a2 2 0 0 1 0 4  h-160 a12 12 0 0 0 0 22 h200 a1 1 0 0 1 0 40"/>
            <path d="M180 1 h20 a2 2 0 0 1 0 4 h-20"/>
            <path d="M30 5 a12 12 0 0 0 0 22"/>
        </svg>
    </div>

);

export default NavItemBg;
