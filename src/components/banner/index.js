import React, { Component } from 'react';

const Banner = ({ children, className }) => (
    <div 
        className={`mw6 ph4 pv3 karla br2 f4 white antialias left-0 right-0 center fixed top-2 z-max ${ className }`}
    >
        { children }
    </div>
);

export default Banner;