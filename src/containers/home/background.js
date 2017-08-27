import React from 'react';
import Star from 'components/assets/star';

const DENSITY = 40; // number of stars per 1000 sq pixels

function randomPos(bound) {
    return Math.random() * bound;
}

function makeStar(width, height) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const xlinkns = 'http://www.w3.org/1999/xlink';

    let star = document.createElementNS(xmlns, "svg");
    star.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", xlinkns);
    star.setAttributeNS(null, 'width', '22');
    star.setAttributeNS(null, 'height', '22');
    star.setAttributeNS(null, 'viewBox', '0 0 22 22');
    star.setAttributeNS(null, 'version', '1.1');
    star.setAttributeNS(null, 'class', 'absolute');
    star.style.top = `${randomPos(height)}px`;
    star.style.left = `${randomPos(width)}px`;

    let g = document.createElementNS(xmlns, 'g');
    // g.setAttributeNS(null, 'transform', `translate(${randomPos(width)}, ${randomPos(height)})`);

    let use = document.createElementNS(xmlns, 'use');
    use.setAttributeNS(xlinkns, "xlink:href", "#path0_fill");
    use.setAttributeNS(null, 'fill', '#E7E4D3');
    use.setAttributeNS(null, 'opacity', `${Math.random() * .8}`);
    use.setAttributeNS(null, 'transform', `scale(${Math.random()})`);

    let defs = document.createElementNS(xmlns, 'defs');

    let path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS(null, 'id', 'path0_fill');
    path.setAttributeNS(null, 'd', 'M 22 11C 15.9211 11 11 6.07895 11 0C 11 6.07895 6.07895 11 0 11C 6.07895 11 11 15.9211 11 22C 11 15.9211 15.9211 11 22 11Z');

    g.appendChild(use);
    star.appendChild(g);
    defs.appendChild(path);
    star.appendChild(defs);

    return star;
}

export default function drawBackground(backgroundElement) {
    const { width, height } = backgroundElement.getBoundingClientRect();
    const numStars = DENSITY * (width * height) / (1000 ** 2);
    let fragment = document.createDocumentFragment();
    
    for (let i = 0; i < numStars; i++) {
        fragment.appendChild(makeStar(width, height));
    }

    console.log(numStars);

    backgroundElement.appendChild(fragment);
}