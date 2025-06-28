//component kahi or h, use kahi or ho rha h. but compoent yha h to uski state to yhi honi chahiye thi , so want the access of that state here,
// for that we need something reference, - ex of forwardRef. 
// we are having same input field, using same in useranme , password , email , etc. but their state is different, so we will use forwardRef to get the reference of the input field and use it in the component where we want to use it, so that we can access the state of the input field from there.
import React, {useId} from 'react';
const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props

}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}> // we just used this for accessibility purpose, so that when we click on the label, it will focus on the input field, well you can remove this also 
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref} // ref jo aapne user se liya h as a prop, usko yha pass kardo, yhi vo cheez h jo aapko access degi parent component ke ander, isi ke liye we used forwardRef. component can be dif dif , but we pass referece from there and YHA SE FIR state ka access bhi liya jaaega.
            {...props}
            id={id} // now the id (unique generated one) ab lable and input dono ke ander same hoga, so that when we click on the label, it will focus on the input field
            />
        </div>
    )
})
export default Input;