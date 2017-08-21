import React from 'react';
import styled from 'styled-components';
import { COLORS, FONTS, FONT_SIZES } from './constants';

const Button = ({ className, text="", backgroundColor=COLORS.DARK_GREY }) => {
    const CustomButton = styled.button`
        background: none;
        border: 0;
        padding: 12px;
        min-width: 120px;
        border-radius: 4px;
        background-color: ${ backgroundColor };
        color: ${ COLORS.OFF_WHITE };
        font-family: ${ FONTS.SECONDARY };
        font-size: ${ FONT_SIZES.MEDIUM };
        margin: 8px;

        &:hover {
            cursor: pointer;
        }

        &::-moz-focus-inner {
            border: 0;
            padding: 0;
        };
    `;

    return (
        <CustomButton 
            type="button"
            className={ className }
        >
            { text }
        </CustomButton>
    );
};

export default Button;