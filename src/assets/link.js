import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants';

const Link = ({ className, children, text="", href="#" }) => {
    const Link = ({ className, children, href="#" }) => (
        <a 
            className={ className }
            href={ href }
        >
            { children }
        </a>
    );

    const StyledLink = styled(Link)`
        color: ${ COLORS.OFF_WHITE };
    `;

    return <StyledLink 
        className={ className }
        children={ children }
        text={ text }
        href={ href }
    />
};

export default Link;