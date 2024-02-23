import { signInWithEmail, signInWithGoogle } from '../../firebase/providers';
import { checkingCredendials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );
    };
};

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );

        const resp = await signInWithGoogle();
        const { ok, errorMessage } = resp;

        if( !ok ) return dispatch( logout( errorMessage ) );
        dispatch( login( resp ) );
    };
};

export const startCreatingUserWithEmail = ({ displayName, email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredendials() );

        const resp = await signInWithEmail({ displayName, email, password });
        const { ok, errorMessage } = resp;

        if( !ok ) return dispatch( logout({ errorMessage }) );
        dispatch( login( resp ) );
    };
};