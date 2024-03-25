import { loginWithEmailPassword, signUpWithEmailPassword, signInWithGoogle, logoutFirebase } from '../../../src/firebase/providers';
import { 
    checkingAuthentication, 
    checkingCredendials, 
    login, 
    logout, 
    startCreatingUserWithEmailPassword, 
    startGoogleSignIn, 
    startLoginWithEmailPassword,
    startLogout
} from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { testUser } from '../../fixtures/authFixtures';


jest.mock('../../../src/firebase/providers');

describe('Tests on auth thunks', () => {

    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should execute checkingCredentials', async() => {
        // console.log(checkingCredendials());

        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
    });

    test('startGoogleSignIn should execute checkingCredentials and login', async() => {
        const response = { ok: true, ...testUser };
        await signInWithGoogle.mockResolvedValue(response);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( login(response) );
    });

    test('startGoogleSignIn should execute checkingCredentials and logout', async() => {
        const response = { ok: false, errorMessage: 'authentication failed' };
        await signInWithGoogle.mockResolvedValue(response);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( logout({ errorMessage: response.errorMessage }) );
    });

    test('startCreatingUserWithEmailPassword should execute checkingCredentials and login', async() => {
        const response = { ok: true, ...testUser };
        const formData = { email: testUser.email, password: 'pass123' };

        await signUpWithEmailPassword.mockResolvedValue(response);

        // thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( login(response) );
    });

    test('startCreatingUserWithEmailPassword should execute checkingCredentials and logout', async() => {
        const response = { ok: false, errorMessage: 'authentication failed' };
        const formData = { email: testUser.email, password: 'pass123' };

        await signUpWithEmailPassword.mockResolvedValue(response);

        // thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( logout({ errorMessage: response.errorMessage }) );
    });

    test('startLoginWithEmailPassword should execute checkingCredentials and login', async() => {
        const response = { ok: true, ...testUser };
        const formData = { email: testUser.email, password: 'pass123' };

        await loginWithEmailPassword.mockResolvedValue(response);

        // thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( login(response) );
    });

    test('startLoginWithEmailPassword should execute checkingCredentials and logout', async() => {
        const response = { ok: false, errorMessage: 'authentication failed' };
        const formData = { email: testUser.email, password: 'pass123' };

        await loginWithEmailPassword.mockResolvedValue(response);

        // thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredendials() );
        expect(dispatch).toHaveBeenCalledWith( logout({ errorMessage: response.errorMessage }) );
    });

    test('startLogout should execute logoutFirebase', async() => {
        // thunk
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
        expect(dispatch).toHaveBeenCalledWith( logout() );
    });

});