import React, { useEffect, useState } from 'react'
import Login from './Login';
import Register from './Register';
import {useSelector, useDispatch}  from 'react-redux'
import {clearError} from '../slices/userSlice'

const Auth = () => {

    const [auth, setAuth] = useState('login');

    const {userInfo, error} = useSelector(state => state.user);

    const dispatch = useDispatch();
    useEffect(() => {

        const errorTimer = setTimeout(() => {
            dispatch(clearError());
        }, 4000)

    }, [error])

    return (
        <div>
            <div className="p-1">
                <h1 className="text-white text-2xl font-bold">  </h1>
                <div className='flex items-center justify-center'>
                    <button
                        onClick={() => setAuth('login')}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setAuth('signup')}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Signup
                    </button>
                </div>
            </div>
            {
                error ? <div className="text-red-500 text-center">{error}</div> : null
            }
            {
                auth === 'login' ?
                <Login setAuth={setAuth}/>
                :<Register setAuth={setAuth}/>
            }
        </div>
    )
}

export default Auth