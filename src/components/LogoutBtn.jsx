import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout() // logout itself a promise, so you get a promise back and you can use .then() and .catch() on it
            .then(() => {
                dispatch(logout()); // dispatch so that the state is updated in the store
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }
    return ( // we are not doing anything else here, so just make a button 
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    );
}

export default LogoutBtn;