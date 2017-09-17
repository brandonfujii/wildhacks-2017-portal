import Pupper from 'api/pupper';

const deleteTalkById = (token, id) => {
    return Pupper.delete(`/talk/${id}`, Pupper.sign({}, token));
};

export default deleteTalkById;
