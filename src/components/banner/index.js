import React from 'react';

const Banner = ({ children, className, isShown }) => (
    <div 
        className={`mw6 ph4 pv3 karla br2 f4 wh-navy antialias left-0 right-0 center fixed top-2 z-max bg-wh-gold animated  
            ${ isShown ? ' slide-down ' : ' slide-up ' }
            ${ className }
        `}
    >
        { children }
    </div>
);

export default Banner;