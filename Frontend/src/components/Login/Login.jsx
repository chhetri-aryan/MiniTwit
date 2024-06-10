import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const Login = () => {

    const [userTemp, setUserTemp] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserTemp({
            ...userTemp,
            [name]: value
        });

    };


    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const URL = "http://localhost:5000/api/auth/login";
  
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify(userTemp)
        });
  
        const res_data = await response.json();
  
        if (response.ok) {
          //token
          storeTokenInLS(res_data.token);
          setUserTemp({
            email: "", password: ""
          });
  
          alert(res_data.msg);
          navigate('/');
          
        } else {
          alert(res_data.msg);
        }
  
        //  console.log(response)
      } catch (error) {
        console.log("Login", error)
        navigate('*');
      }
  
  
    };


    return (
        <div className='h-screen'>
            <div className="flex flex-wrap min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                    <img
                        className="mx-auto h-20 w-auto lo"
                        src={logo}
                        alt="Your Company"
                    />

                    <div className="flex items-center justify-center">
                        <span className="relative inline-flex">
                            <h1 className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-6xl text-sky-700 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20" disabled="">
                                MiniTwit
                            </h1>
                            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-700 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-700"></span>
                            </span>
                        </span>
                    </div>



                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black underline decoration-pink-500 hover:decoration-4 ">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} action='#' method='POST'>
                        <div>
                            <label htmlFor="email" className="text-lg font-medium leading-6 text-black ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userTemp.email}
                                    onChange={handleInput}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-lg font-medium leading-6 text-black">
                                    Password
                                </label>
                                <div className="text-sm">

                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={userTemp.password}
                                    onChange={handleInput}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button

                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-s">
                        New to MiniTwit?{' '}
                        <NavLink to="/register" className="font-semibold leading-6 hover:text-sky-700">
                            Register here!
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login