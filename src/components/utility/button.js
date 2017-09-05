import React from 'react';
import { Link } from 'react-router-dom'

const Button = ({ 
    className, 
    children, 
    to,
    backgroundColor="bg-wh-black", 
    antialias=true,
    onClick,
    type=""
}) => {
    const classes = `button-reset f5 karla link dim br2 ph4 pv2 dib white b--none pointer
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
            <button 
                className={ classes }
                onClick={ onClick }
                type={ type || "button" }
            >
                { children }
            </button>
    );
};

export default Button;