import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {userInfo} = useSelector((store)=>store.user);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  }

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-red-50 w-full h-24 border-b-4 md:flex md:justify-between md:items-center">
      <div className="flex justify-between items-center">
        <div>
          <img className="w-24" src="https://i.pinimg.com/originals/99/b5/3a/99b53a8e613de20c94fe05b55638dcbc.png" alt="" />
        </div>
        <div className="md:hidden">
          <button
            className="block p-3 text-xl"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <div
        className={`z-20 absolute h-max w-full md:flex md:flex-col md:items-center bg-red-50 md:bg-red-50 transition ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col md:flex-row">
          <li onClick={()=>toggleMenu()} className="p-3 font-bold text-xl">
            <Link to="/">Profile</Link>
          </li>
          <li onClick={()=>toggleMenu()} className="p-3 font-bold text-xl">
            <Link to="/about">About Us</Link>
          </li>
          <li onClick={()=>toggleMenu()} className="p-3 font-bold text-xl">
            <Link to="/contact">Contact Us</Link>
          </li>
          {userInfo?.user?.userRole === 'admin' ? (
            <li onClick={()=>toggleMenu()} className="p-3 font-bold text-xl text-green-600">
              <Link to="/dashboard">Admin Dashboard</Link>
            </li>
          ) : null}
          {userInfo ? (
            <button
              onClick={logoutHandler}
              className="p-3 font-bold text-xl text-red-600"
            >
              Logout
            </button>
          ) : (
            <li onClick={()=>toggleMenu()} className="p-3 font-bold text-xl">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-red-50 w-full h-24 border-b-4 flex justify-between items-center">
  //       <div>
  //           <img className="w-24" src="https://i.pinimg.com/originals/99/b5/3a/99b53a8e613de20c94fe05b55638dcbc.png" alt="" />
  //       </div>
  //       <div>
  //           <ul className="flex ">
  //           <li className="p-3 font-bold text-xl"><Link to='/'>Profile</Link></li>
  //           <li className="p-3 font-bold text-xl"><Link to='/about'>About Us</Link> </li>
  //           <li className="p-3 font-bold text-xl"><Link to='/contact'>Contact Us</Link></li>
  //           {
  //             userInfo?.user?.userRole === 'admin'?
  //             <li className="p-3 font-bold text-xl text-green-600"><Link to='/dashboard'>Admin Dashboard</Link></li>
  //             :null
  //           }
  //           {
  //             userInfo?
  //             <button onClick={()=>logoutHandler()} className="p-3 font-bold text-xl text-red-600">Logout</button>
  //             : <li className="p-3 font-bold text-xl"> <Link to='/login'>Login</Link> </li>
  //           }
            
  //           </ul>
  //       </div>
  //   </div>
  // )
}

export default Header