import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({
    className,
    children,
    to,
    text="",
    href="#",
    antialias=true,
    onClick
}) => {
    const classes = `f5 karla link underline 
        ${ antialias ? 'antialias ' : ''}
        ${ className }
    `;

    return ( to?
        <Link 
            to={ to } 
            className={ classes }
        >
            { children }
        </Link>
        :
        <a 
            className={ classes }
            href={ href }
            onClick={ onClick }
        >
            { children }
        </a>
    );
};

export default CustomLink;