import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})



export const googleSignInStart = () => ({
    type: userTypes.GOOGLE_SIGN_IN_START
})

export const googleSignInSucccess = (user) => ({
    type: userTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

export const googleSignInFailure = (errorMessage) => ({
    type: userTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: errorMessage
})


export const emailSignInStart = (emailAndPassword) => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const emailSignInSucccess = (user) => ({
    type: userTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
})

export const emailSignInFailure = (errorMessage) => ({
    type: userTypes.EMAIL_SIGN_IN_FAILURE,
    payload: errorMessage
})