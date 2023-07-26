import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Login from './components/Login';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserData } from './slices/userSlice';

function App() {

  const {userInfo, loading} = useSelector((store)=>store.user);
  console.log(userInfo);

  const dispatch = useDispatch();

  const fetchUserProfile = ()=>{
    dispatch(fetchUserData());
  }

  useEffect(()=>{
    fetchUserProfile();
  },[])

  return (
    <>
    <Header />
    {
      userInfo?<Outlet />:<Login/>
    }
    </>    

  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Profile />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
])



export default appRouter;
