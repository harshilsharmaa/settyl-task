import React, { useState } from 'react'
import {registerUser} from '../slices/userSlice';
import { useDispatch } from 'react-redux';

const Register = ({setAuth}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const dispatch = useDispatch();

  const handleRegister = (e)=>{
    e.preventDefault();

    if(!name || !email || !password) return;
    dispatch(registerUser({name, email, password}));
  }

  return (
    <div className="m-1 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input onChange={(e)=>setName(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name"/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
        </div>
        <button onClick={(e)=>handleRegister(e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Signup
        </button>

      </form>
        <button onClick={()=>setAuth('login')} className='pt-5 text-blue-600'>Already Registerd? Signin now.</button>
    </div>
  </div>
  )
}

export default Register