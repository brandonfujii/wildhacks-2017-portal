import React from 'react';
import { Link } from 'react-router-dom'

const Button = ({ 
    className, 
    children, 
    to,
    href="#",
    backgroundColor="bg-wh-black", 
    antialias=true,
    onClick
}) => {
    const classes = `button-reset f5 karla link dim br2 ph4 pv2 dib white 
        ${ antialias ? 'antialias ' : ''}
        ${ backgroundColor }
        ${ className }
    `;

    return ( to ?
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

export default Button;