import { authSlice, checkingCredendials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState, testUser } from '../../fixtures/authFixtures';

describe('authSlice tests', () => {

    test('should return the initial state', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('should authenticate the user', () => {
        // console.log(login( testUser ))
       const state = authSlice.reducer(initialState, login(testUser));

       expect(state).toEqual({
            status: 'authenticated',
            uid: testUser.uid,
            email: testUser.email,
            displayName: testUser.displayName,
            photoURL: testUser.photoURL,
            errorMessage: null
       });
    });

    test('should logout the user', () => {
        // console.log(logout());
        const state = authSlice.reducer(authenticatedState, logout());
       
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
       });
    });

    test('should logout the user and set an error message', () => {
        // console.log(logout(errorMessage));
        const errorMessage = 'authorization failed';
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
       
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
       });
    });

    test('should update the status to "checking"', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredendials());
        expect(state.status).toBe('checking')
    });

});