import Pupper from 'api/pupper';
import { CONFIG } from 'config';

const deleteUserById = (token, id) => {
    return Pupper.delete(`/user/${id}`, 
        Pupper.sign({}, token, CONFIG.GATEKEY)
    );
};

export default deleteUserById;
