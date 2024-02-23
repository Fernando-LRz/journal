import { 
    signInWithEmailPassword, 
    signInWithGoogle, 
    loginWithEmailPassword, 
    logoutFirebase 
} from '../../firebase/providers';

import { checkingCredendials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );
    };
};

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );

        const result = await signInWithGoogle();
        const { ok, errorMessage } = result;

        if( !ok ) return dispatch( logout( errorMessage ) );
        dispatch( login( result ) );
    };
};

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );

        const result = await signInWithEmailPassword({ displayName, email, password });
        const { ok, errorMessage } = result;

        if( !ok ) return dispatch( logout({ errorMessage }) );
        dispatch( login( result ) );
    };
};

export const startLoginWithEmail = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );

        const result = await loginWithEmailPassword({ email, password });
        const { ok, errorMessage } = result;

        if( !ok ) return dispatch( logout({ errorMessage }) );
        dispatch( login( result ) );
    };
};

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
    };
};