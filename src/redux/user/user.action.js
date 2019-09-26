import userTypes from './user.types';


export const googleSignInStart = () => ({
    type: userTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = (emailAndPassword) => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const signInSucccess = (user) => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = (errorMessage) => ({
    type: userTypes.SIGN_IN_FAILURE,
    payload: errorMessage
})


