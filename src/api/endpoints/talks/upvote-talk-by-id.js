import Pupper from 'api/pupper';

const upvoteTalkById = (token, id) => {
    return Pupper.put(`/talk/${id}/upvote`,
        Pupper.sign({}, token));
};

export default upvoteTalkById;
