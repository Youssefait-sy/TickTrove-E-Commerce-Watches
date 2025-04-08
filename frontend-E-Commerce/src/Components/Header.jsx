import { Link, useNavigate } from 'react-router-dom';
import DarkLogo from '../assets/Logo/Watch.png';
import WhiteLogo from '../assets/Logo/White.png';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Config/userSlice';

const Header = () => {
    const [ishover,setishover] = useState(false);
    const [isMenuOpen,setisMenuOpen] = useState(false);
    const user = useSelector(state => state.userData.user); 
    const items = useSelector(state => state.favData.items);
    const cartitems = useSelector(state => state.cartData.cartItems);
    const favCount = useSelector(state => state.favData.favCount);
    const cartCount = useSelector(state => state.cartData.cartCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSticky,setisSticky] = useState(false);

        useEffect(()=>{
            const handleScroll = () => {
                setisSticky(window.scrollY > 0);
            }
            window.addEventListener('scroll',handleScroll);
            return () => removeEventListener('scroll',handleScroll);
        })

    const HandleDisplay = () => {
        const WatchMenu = document.querySelector('.watch-menu ul');
        WatchMenu.classList.toggle('show');
        setisMenuOpen(!isMenuOpen);
    }

    const HandleLogout = (e) => {
        e.preventDefault();

        if(user){
            dispatch(logout());
            navigate('/');
        }
    }

    return(
        <header onMouseEnter={()=>setishover(true)} onMouseLeave={(()=>setishover(false))} className={`${isSticky ? 'fixed top-0 left-0 w-full bg-slate-900' : 'relative'} transition-all duration-1000 z-50 h-[100px] ease-in-out 
            ${ishover || isSticky  ? "bg-slate-900 shadow-md" : "bg-white shadow-md"} ${isMenuOpen && 'sm:bg-slate-900 sm:shadow-2xl sm:scale-110'} z-50`}>
            <div className='px-12 py-6 flex justify-between items-center'>
                <Link to={'/'}>
                    <img src={ishover || isMenuOpen || isSticky ? WhiteLogo : DarkLogo} alt="my-logo" width={90} />
                </Link>
                <ul className={`flex my-nav md:block space-x-4 lilita-font font-bold text-[22px] ${ishover ? 'text-white' : 'text-slate-900'}`}>
                        <li>
                            <Link to={'/'} className={`${ishover && 'hover:text-gray-100 text-white hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'} ${isSticky && 'text-white'}`}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'} className={`${ishover && 'hover:text-gray-100 text-white hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'} ${isSticky && 'text-white'}`}>About</Link>
                        </li>
                        <li>
                            <Link to={'/products'} className={`${ishover && 'hover:text-gray-100 text-white hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'} ${isSticky && 'text-white'}`}>Products</Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className={`${ishover && 'hover:text-gray-100 text-white hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'} ${isSticky && 'text-white'}`}>Contact</Link>
                        </li>
                        <li>
                            <Link to={'/product/fav'} className='relative'>
                                <i className={`${ishover || isSticky  ? 'text-white' : 'text-slate-900'} ri-heart-3-line text-[24px]`}></i>
                                {items.length > 0 ? 
                                <span className="absolute -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {user ? favCount  : 0}
                                </span> : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/product/cart'} className='relative'>
                                <i className={`${ishover || isSticky  ? 'text-white' : 'text-slate-900'} ri-shopping-bag-line text-[24px]`}></i>
                                {cartitems.length > 0 ?
                                <span className="absolute -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {user  ? cartCount  : 0}
                                </span> : ''}
                            </Link>
                        </li>
                        {user ? <form onSubmit={HandleLogout}>
                            <button className={`${ishover || isSticky ? 'lilita-font text-white text-[24px] hover:bg-amber-500 transition-colors duration-400 rounded-4xl cursor-pointer -mt-3 px-2 py-1': ''}`}>Logout</button>
                        </form> :
                        <li>
                            <Link to={'/login'} className={`${ishover && 'hover:text-gray-100 text-white hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'} ${isSticky && 'text-white'}`}>Login</Link>
                        </li>}
                </ul>
                <div className='btn-watch lg:hideen xl:hidden'>
                    <button className='cursor-pointer' onClick={HandleDisplay}>
                        {isMenuOpen ? <i className="ri-close-large-line text-4xl text-white"></i> : <i className={`ri-menu-line text-4xl ${ishover || isSticky ? 'text-white' : 'text-black'}`}></i>}
                    </button>
                </div>
            </div>
            <div className={`watch-menu hidden ${isMenuOpen ? 'flex justify-center fixed top-20 w-full transition-all duration-500 ease-in-out bg-slate-900 translate-x-0 opacity-100': 'bg-transparent -translate-x-full opacity-0'}`}>
                <ul className={`text-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} lilita-font space-y-4 my-4 text-white text-[22px] font-bold`}>
                        <li>
                            <Link to={'/'} className={`${ishover && 'hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'}`}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/about'} className={`${ishover && 'hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'}`}>About Us</Link>
                        </li>
                        <li>
                            <Link to={'/products'} className={`${ishover && 'hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'}`}>Products</Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className={`${ishover && 'hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'}`}>Contact</Link>
                        </li>
                        <li>
                            <Link to={'/product/fav'} className='relative'>
                                <i className={`${ishover || isSticky  ? 'text-white' : 'text-slate-900'} ri-heart-3-line text-[24px]`}></i>
                                {items.length > 0  ? 
                                <span className="absolute -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {user ? favCount  : 0}
                                </span> : ''}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/product/cart'} className='relative'>
                                <i className={`${ishover || isSticky  ? 'text-white' : 'text-slate-900'} ri-shopping-bag-line text-[24px]`}></i>
                                {cartitems.length > 0 ?
                                <span className="absolute -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {user  ? cartCount  : 0}
                                </span> : ''}
                            </Link>
                        </li>
                        {user?.username ? <form onSubmit={HandleLogout}>
                            <button className={`${ishover && 'lilita-font text-white text-[24px] hover:bg-amber-500 transition-colors duration-400 rounded-4xl cursor-pointer -mt-3 px-2 py-1'}`}>Logout</button>
                        </form> :
                        <li>
                            <Link to={'/login'} className={`${ishover && 'hover:text-gray-100 hover:transition-all hover:pb-1 hover:duration-200 hover:border-b-[3px] hover:border-white'}`}>Login</Link>
                        </li>} 
                </ul>
            </div>
        </header>
    )
}

export default Header;