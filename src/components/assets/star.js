import React from 'react';

const Star = ({ className, fill="#ffffff" }) => {
    return (
        <svg
            width="22" 
            height="22" 
            viewBox="0 0 22 22" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
                <use xlinkHref="#path0_fill" fill="#E7E4D3"/>
            </g>
            <defs>
                <path id="path0_fill" d="M 22 11C 15.9211 11 11 6.07895 11 0C 11 6.07895 6.07895 11 0 11C 6.07895 11 11 15.9211 11 22C 11 15.9211 15.9211 11 22 11Z"/>
            </defs>
        </svg>
    )
};

export default Star;