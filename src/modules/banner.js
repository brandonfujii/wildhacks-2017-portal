export const DISPLAY_BANNER = 'banner/DISPLAY_BANNER';
export const DISMISS_BANNER = 'banner/DISMISS_BANNER';

// State & Reducers
const initialState = {
    banner: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case DISPLAY_BANNER:
            return {
                ...state,
                banner: action.banner
            };
        case DISMISS_BANNER: 
            return {
                ...state,
                banner: null
            };
        default:
            return state;
    }
}

export const displayBanner = (banner, lifespan=500) => {
    return async dispatch => {
        dispatch({
            type: DISPLAY_BANNER,
            banner
        });
        setTimeout(() => dispatch({ type: DISMISS_BANNER, }), lifespan);
    };
};

export const dismissBanner = () => {
    return dispatch => {
        dispatch({
            type: DISMISS_BANNER,
        });
    };
};