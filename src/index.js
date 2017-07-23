import React from 'react';
import { render } from 'react-dom';
import Pupper from './api/pupper';

Pupper
    .get('/ping', {
        headers: {
            'X-Access-Gatekey': 'blah',
        },
        body: {
            someshit: 'idk',
        }
    })
    .then(data => {
        console.log(data);
    });


const testRegister = () => {
    Pupper
        .post('/auth/register', {
            body: {
                email: 'test@email.com',
                password: 'testpass',
            },
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
};

render(<div>Hello World</div>,
    document.getElementById('root'));