import { signInWithGoogle } from '../../firebase/providers';
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
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    };
};