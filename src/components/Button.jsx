// we can design a common button component that can be used in different places
import React from 'react';
// what parameters do we want to accept and pass, and how do we want to use them. 

// the very first parameter used to take is children, which is the content of the button, then we can take other parameters like className, onClick, disabled, type etc.
// although childern is just a name, you can give any name to it
function Button({
    children, 
    type = 'button', // default type is button, you can change it to submit or reset or anything else
    bgColor = 'bg-blue-500', // default background color is blue, you can change it to any color you want
    textColor = 'text-white', // default text color is white, you can change it
    className = '', // default className is empty, you can change it to any class you want
    ...props // this will take all the other props that you want to pass to the button, like onClick, disabled etc.
}){
    return (
        <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}> // cz are were using backticks, and it is sytax of js , so we have to write everything in the curly braces.
            {children}
        </button>
    )
}