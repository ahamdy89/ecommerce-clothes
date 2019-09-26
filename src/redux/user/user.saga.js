import {takeLatest, put, all, call} from 'redux-saga/effects';
import userTypes from './user.types';
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils';
import {signInSucccess, signInFailure, signOutFailure, signOutSucccess, signUpFailure, signUpSucccess } from './user.action';




export function* getSnapshotFromUserAuth (userAuth, addionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, addionalData);
        const userSnapShot = yield userRef.get();
        yield put(signInSucccess({
            id: userSnapShot.id,
            ...userSnapShot.data()
        }))
    } catch (error) {
        yield put(signInFailure(error));
        
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup (googleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error));
    }
}



export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield (put(signOutSucccess()))
    } catch (error) {
        yield (put(signOutFailure(error)))
    }
}


export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSucccess({user, addionalData: {displayName}}))

        
    } catch (error) {
        yield (put(signUpFailure(error)))
    } 
}


export function* signInAfterSignUp({payload:{user, addionalData}}) {
    yield getSnapshotFromUserAuth(user, addionalData);
}


export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}


export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


export function* onSignOutStart() {
    yield takeLatest(userTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(userTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(userTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)

    ]);
}
