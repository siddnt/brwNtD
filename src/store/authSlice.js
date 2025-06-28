import {createSlice} from '@reduxjs/toolkit';
// we will track the authentication state of the user using this slice , user authenticated h ki nahi , ye m har baar store se poochounga 

const initialState = {
    status : false, // by default user is not authenticated
    userData : null // we are not having any user data at the start
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.status = true;
            state.userData = action.payload; // you can do- state.userData = action.payload.userData; both are same here
        },
        logout(state) {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions; // we call actions bz these methods inside the reducers are called actions
export default authSlice.reducer;
