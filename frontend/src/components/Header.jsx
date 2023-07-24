
const Header = () => {
  return (
    <div className="bg-red-50 w-full h-24 border-b-4 flex justify-between items-center">
        <div>
            <img className="w-24" src="https://i.pinimg.com/originals/99/b5/3a/99b53a8e613de20c94fe05b55638dcbc.png" alt="" />
        </div>
        <div>
            <ul className="flex ">
            <li className="p-3 font-bold text-xl">Login</li>
            <li className="p-3 font-bold text-xl">Profile</li>
            <li className="p-3 font-bold text-xl">About Us</li>
            <li className="p-3 font-bold text-xl">Contact Us</li>
            </ul>
        </div>
    </div>
  )
}

export default Header