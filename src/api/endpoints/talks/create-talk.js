import Pupper from 'api/pupper';

const createTalk = (token, options) => {
    const { name, description, tags } = options;

    return Pupper.post('/talk/create',
        Pupper.sign({
            body: {
                name,
                description,
                tags,
            },
        }, token));
};

export default createTalk;
