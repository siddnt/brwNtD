import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("") // this is common practice to make sure that error is cleared before making a new request
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData)); //why? Because we want to store the user data in the Redux store for later used
                navigate("/") // navigate will send the user to home page after successful login without clicking on any button, which would be neccessary if we were using Link component
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'> // now handleSumit have become a keyword, handleSubmit is method where you give your method, handleSubmit is an event which gets called, this came from useForm hook, and it is imp cz , tumhare jitne bhi inputs hain vaha hum register ko use karte hain, so automatically jo values aapne likhi h , unki state aapko manage nhi karna, it pick the values automatically and pass it to the function you give in handleSubmit.
                    <div className='space-y-5'>
                        <Input // component vaala input 
                            label="Email: " // label
                            placeholder="Enter your email" // will get in ...props
                            type="email" // this will be used for @ and other email related validations
                            // now js, which is required in all input feilds
                            {...register("email", { // if you would not write ..., then if you are using regieter in any other innpt also then the value will get overridden, so you have to use spread everytime , compulsory
                                // the email you are passing abouve should be unique. and second thing that use passing is an object, which is having properties like required, validate, etc.
                                required: true, 
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || // this is a regex for email validation, it will check if the email is valid or not, you can visit website - regexr.com to get more such regex according to your needs
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true, // whatever you wanna pass, like here i don not want to pass validate, so i am just passing required, you can pass any other validation you want
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login