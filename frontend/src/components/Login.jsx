import React, { useState } from 'react'
import {loginUser} from '../slices/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = (e)=>{
    e.preventDefault();

    if(!email || !password) return;
    console.log(password);

    dispatch(loginUser({email, password}));
  }

  return (
    <div className="m-3 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input onChange={(e)=>setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
        </div>
        <button onClick={(e)=>handleLogin(e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Log in
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login