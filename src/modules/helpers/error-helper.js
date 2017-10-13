import { push } from 'react-router-redux';
import { displayBanner } from 'modules/banner';

const checkError = async (dispatch, error) => {
    console.error(error);

    if (!error) {
        dispatch(displayBanner('Oops! Something went wrong', 5000));
        dispatch(push('/logout'));
        return;
    }

    switch(error.statusCode) {
        case 401: // Authorization error
            dispatch(push(displayBanner('You must login to access this resource', 5000)))
            dispatch(push('/logout'));
            break;
        case 429: // Too many requests error
            dispatch(displayBanner('Too many requests', 5000));
            dispatch(push('/logout'));
            break;
        case 500: // Internal server error
            dispatch(displayBanner('Oops! Something went wrong', 5000));
            dispatch(push('/logout'));
            break;
        default:
            break;
    }
};

export default checkError;
