import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'
import { NavLink } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        username: "",
        phone: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const URL = "http://localhost:5000/api/auth/register"
  
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify(user)
        });
  
        const res_data = await response.json();
       // console.log(res_data.msg)
  
        if (response.ok) {
          //token
  
          setUser({
            username: "", phone: "", email: "", password: ""
          });
  
          alert("Registration Successfully, Please Login");
          navigate("/login")
  
        } else {
          alert(res_data.msg );
  
        }
  
      } catch (error) {
        console.log("Register", error)
        navigate('*');
      }

    }

    return (
        <>
            <div class="bg h-screen">
                <div className="row flex-wrap max-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Your Company"
                        />

                        <div class="flex items-center justify-center">
                            <span class="relative inline-flex">
                                <h1 class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-6xl text-sky-700 transition ease-in-out duration-150 ring-1 ring-slate-900/10 dark:ring-slate-200/20" disabled="">
                                    MiniTwit
                                </h1>
                                <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-700"></span>
                                </span>
                            </span>
                        </div>

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black underline decoration-pink-500 hover:decoration-4">
                            Sign Up here!
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit} action='#' method='POST'>
                            <div>
                                <label htmlFor="username" className="text-lg font-medium leading-6 text-black ">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete='off'
                                        value={user.username}
                                        onChange={handleInput}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="text-lg font-medium leading-6 text-black ">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="text-lg font-medium leading-6 text-black ">
                                    Phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        autoComplete="phone"
                                        value={user.phone}
                                        onChange={handleInput}
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

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={handleInput}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            </div>

                            <p className="mt-10 text-center text-s">
                                Want to login?{' '}
                                <NavLink to='/login' className="font-semibold leading-6  hover:text-sky-700">
                                    Click here!
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register