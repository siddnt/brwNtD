// now this compoenet is also related to authentication, we will use this many times, also in next.js 
// actullly this is a mechanism to how to protect your routes or pages. 
// so we will make a protectted contaioner 

import React, {useEffect, useState} from 'react';
import { set } from 'react-hook-form';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication = true}) { // file name name and function name can be diff also. 
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);   

    // now you have ask from authStatus whether you are logged in or not. we will ask from redux store, so we will use useSelector hook from react-redux
    const authStatus = useSelector((state) => state.auth.status); // this will give us the status of authentication, whether user is logged in or not

    useEffect(() => {
        // true && (false !== true )
        if(authentication && authStatus !== authentication){ // after authentication is true(which is sent by user) and will do one more check based on authStatus, maybe you do not even need of authentication , this way you will improve more security though, 
            navigate('/login'); // you are not authenticated, so redirect to login page. 
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/'); 
        } // although this has become a bit complex code, better if you needk so apply if else on authStatus only
        setLoader(false); // this will set the loader to false after checking the authentication status, so that it will not show the loader again and again
    },[authStatus, navigate, authentication]); // these things will keep changing, for monitoring the changes, where user is - navigate, authentication - whether you want to protect the route or not, if you want to protect the route then authentication will be true, otherwise false
    return loader ? <h1>Loading...</h1> : <>{children}</>; // not understood what does this line mean ? , i have not understood what is loader ? 
}
