import React from 'react';
import styled from 'styled-components';

const Wordmark = ({ className, stroke="#000000" }) => {
    const path = ({ className, d }) => (
        <path className={ className } d={ d }></path>
    );

    const Line = styled(path)`
        fill: none;
        stroke: ${stroke};
        stroke-width: 4;
        stroke-linecap: round;
        stroke-miterlimit: 10;
    `;

    const LineJoin = styled(path)`
        fill: none;
        stroke: ${stroke};
        stroke-width: 4;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
    `;

    return (
        <div className={ className }>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                viewBox="0 0 629.8 290.2"
                style={{ enableBackground:'new 0 0 629.8 290.2' }}
                xmlSpace="preserve"
            >
                <g>
                    <g>
                        <Line d="M275.8,87.2c27.5-8.1,62.2-20.2,78.3-57.3"/>
                        <Line d="M354.2,29.9c-8.1,16.1-72.7,224.5-75.9,240.6"/>
                        <Line d="M278.3,270.5c6.5-63-16.5-115.3-21.4-118.5"/>
                        <Line d="M256.9,152c25.8,0,133.2-48.9,159-65"/>
                        <Line d="M413.1,12.9C405,38.8,359.8,179.3,355,206.7"/>
                        <Line d="M541,17.4c-6.5,17.8-33.1,118.7-33.1,118.7"/>
                        <Line d="M555.5,59.4c-16.1,8.1-8.1,40.4-34.9,35.9"/>
                        <Line d="M519.7,97.8c17.3,4.4,9.2,33,23.7,28.2c14.5-4.8,17-48,32-62"/>
                        <Line d="M575.4,64c-6,15,33,51.1,4.4,51.1c-19.4,0-9.4-32.1,46-41.2"/>
                        <Line d="M609.4,133"/>
                        <Line d="M334,255.2"/>
                        <Line d="M435.4,128c1-14-2.8-18-11-18s-24,12.1-24,45c0,6.2,2,13,10,13c12.3,0,19.4-9.7,24.3-33.9"/>
                        <Line d="M493.7,109.5c2.1-14.4,5.7-20.4-2.5-20.4s-28.2,8.5-28.2,41.4c0,9.7,5.1,16.1,11.3,16.1c3,0,19,3.4,37-25.6"
                            />
                        <Line d="M446,96.6c-9.7,14.5-18.6,58.4-2.6,58.4c13.3,0,15.9-10.8,20-19"/>
                    </g>
                    <g>
                        <Line d="M279.4,4c-13,42-42,120.6-24.2,120.6c6.5,0,10.4-3.8,14.5-12"/>
                        <Line d="M59.3,117.4c-11.3,14.5-27.5,37.1-48.4,37.1s10.5-60.9,34.7-93.2"/>
                        <LineJoin d="M45.6,61.4c11.3,11.3-15.3,198.1-15.3,198.1S67.8,174.6,86,137.6"/>
                        <LineJoin d="M86,137.6c6.5,17.8,13.4,68.4,13.4,68.4s27.7-176.6,77-200"/>
                        <Line d="M190,84.2c9.7-4.8,23.4-9.2,31.4-34.2c2.5-7.8,4-27-5.3-27c-16.1,0-60.4,135-32.7,135c28.3,0,30-44,30-44"/>
                        <Line d="M156.4,89c-2,6-6.9,21.5-6.9,21.5"/>
                        <Line d="M144.4,125c-5,18-15.4,52,4,52c8.1,0,17.9-9,26-30"/>
                        <Line d="M252.4,93c4-15-1.2-16.2-9.4-16.2c-8.2,0-29.6,9.4-29.6,42.2c0,6.2,2.9,16,10,16c14.9,0,24-10,27-34"/>
                        <Line d="M282.4,143.8"/>
                        <Line d="M53.9,270.6"/>
                    </g>
                    <Line d="M336,262.2C386,220.2,500.4,161,611.4,140"/>
                    <Line d="M41,286.2C91,244.2,149.9,202,242.9,171"/>
                </g>
            </svg>
        </div>
    );
};

export default Wordmark;
