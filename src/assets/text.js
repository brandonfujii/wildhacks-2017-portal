import React from 'react';
import styled from 'styled-components';
import { COLORS, FONTS, FONT_SIZES } from './constants';

const Text = ({ 
    className,
    children,
    font=FONTS.SECONDARY,
    color=COLORS.OFF_WHITE,
    fontSize=FONT_SIZES.MEDIUM,
    textAlign="left",
    antiAlias=true,
    lineHeight="1.2"
}) => {
    const Text = styled.p`
        font-family: ${ font };
        color: ${ color };
        font-size: ${ fontSize };
        text-align: ${ textAlign };
        line-height: ${ lineHeight };
        -webkit-font-smoothing: ${ antiAlias ? 'antialiased' : 'normal' };
    `;

    return (
        <Text className={ className }>
            { children }
        </Text>
    );
};

export default Text;