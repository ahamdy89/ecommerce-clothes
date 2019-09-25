import userTypes from './user.types';


const INITIAL_STATE = {
    currentUser : null,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case userTypes.GOOGLE_SIGN_IN_SUCCESS:
        case userTypes.EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser : action.payload,
                errorMessage: null
            }

        case userTypes.GOOGLE_SIGN_IN_FAILURE:
        case userTypes.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                errorMessage: action.payload

            }
    
        default:
            return state;
    }
}


export default userReducer;