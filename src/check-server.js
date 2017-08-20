import { getPing } from 'api';

export const THE_SHERIFF = `
           🤠
　　　　　 💯💯💯
　　　　💯 　💯　💯
　　　👇　  💯💯　👇
　　　　　💯　  💯
　　　　　💯　　💯
　　　　　👢　　👢
`;

const checkServer = () => {
    getPing().then(response => {
        if (response.pong) {
            console.log('Howdy, I\'m the sheriff of remote APIs');
            console.log(THE_SHERIFF);
            console.log('And you\'re connected to the WH remote API');
        }
    }).catch(err => console.warn('⚠️ Cannot connect to remote API'));
};

export default checkServer;
