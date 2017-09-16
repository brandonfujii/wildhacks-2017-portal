import Pupper from 'api/pupper';

const downvoteTalkById = (token, id) => {
    return Pupper.delete(`/talk/${id}/upvote`,
        Pupper.sign({}, token));
};

export default downvoteTalkById;
