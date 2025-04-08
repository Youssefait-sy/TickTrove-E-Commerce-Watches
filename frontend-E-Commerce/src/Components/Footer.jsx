import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Config/userSlice";

const Footer = () => {
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleLogout = (e) => {
        e.preventDefault();

        if(user){
            dispatch(logout());
            navigate('/');
        }
    }

    return(
        <footer className="mt-5 bg-slate-900">
            <div id="my-footer" className="flex items-center justify-center space-x-5 container mx-auto px-8 py-6">
                <p className="text-white lilita-font font-bold text-[20px]">&copy;{new Date().getFullYear()} All Rights Reserved.</p>
                <span className="border-r-2 h-5 mt-1 border-white"></span>
                <ul id="my-links" className="flex space-x-5">
                    <li className="lilita-font font-bold text-white text-[20px]">
                        <Link to={'/'} className="hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white">Home</Link>
                    </li>
                    <li className="lilita-font font-bold text-white text-[20px]">
                        <Link to={'/about'} className="hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white">About</Link>
                    </li>
                    <li className="lilita-font font-bold text-white text-[20px]">
                        <Link to={'/Products'} className="hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white">Products</Link>
                    </li>
                    <li className="lilita-font font-bold text-white text-[20px]">
                        <Link to={'/contact'} className="hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white">Contact</Link>
                    </li>
                    {user ? <form onSubmit={HandleLogout}>
                            <button className={`lilita-font font-bold text-white text-[20px] hover:bg-amber-600 transition-colors duration-400 rounded-4xl -mt-1 cursor-pointer px-2 py-1`}>Logout</button>
                    </form> :
                    <li className="lilita-font font-bold text-white text-[20px]"> 
                            <Link to={'/login'} className={`hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white`}>Login</Link>
                    </li>}
                </ul>
            </div>
        </footer>
    )
}

export default Footer;