import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUsers, fetchUserData } from './slices/userSlice';
import Auth from './components/Auth';
import AdminDash from './components/AdminDash';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

function App() {

  const {userInfo, loading} = useSelector((store)=>store.user);

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchUserData());
  },[])

  useEffect(()=>{
    if(userInfo){
      dispatch(fetchAllUsers());
    }
  },[userInfo])

  return (
    <>
    <Header />
    {
      loading?<h1>Loading...</h1>:
      userInfo?<Outlet />:<Auth />
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
        path: "/dashboard",
        element: <AdminDash/>
      },
      {
        path: "/about",
        element: <AboutUs/>
      },
      {
        path: "/contact",
        elememt: <ContactUs/>
      }
    ]
  }
])



export default appRouter;
