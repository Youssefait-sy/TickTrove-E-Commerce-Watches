import { Link, useNavigate } from 'react-router-dom';
import LoginLg from '../assets/Login/WatchLogo1.jpg';
import LoginSm from '../assets/Login/WatchLogo.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser, setToken } from '../Config/userSlice';

const Login = () => {
    const [imageSrc, setImageSrc] = useState(
        window.innerWidth < 993 ? LoginSm : LoginLg
    );
    const [formData,setformData] = useState({
        identifier:'',
        password:''
    });
    const [Errors,setErrors] = useState({identifier:'',password:''});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleErrors = (data) => {
        if(data?.error?.message){
            let newError = {...Errors};
            switch (true) {
                case data.error.message.includes('identifier is a required field'):
                    newError.identifier = data.error.message;
                    break;
                case data.error.message.includes('Invalid identifier or password'):
                    newError.identifier = data.error.message;
                    break;
                case data.error.message.includes('password is a required field'):
                    newError.password = data.error.message;
                    break;
            }
            setErrors(newError)
        }else{
            setErrors({});
        }
    }

    useEffect(()=>{
        const Handleresize = () => {
            setImageSrc(window.innerWidth < 993 ? LoginSm : LoginLg);
        }
        window.addEventListener('resize',Handleresize);

        return () => window.removeEventListener('resize',Handleresize);
    })

    const HandleLogin = async(e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/local',{
            method:'POST',
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        if (data.error) {
            HandleErrors(data);
        }else {
            setErrors({});
            localStorage.setItem('jwt',data.jwt);
            dispatch(setToken(data.jwt));
            dispatch(fetchUser(data.jwt));
            navigate('/')
        }
    }

    return(
        <div id="my-login" className="flex lg:my-14 md:my-8 sm:my-0 justify-center space-x-8 w-full md:px-3">
            <div id="img" className='w-[45%] md:w-[35%] lg:mt-6 md:mt-14'>
                <img src={imageSrc} width={600} className='xl:h-[650px] md:h-[500px]' alt="my-login" />
            </div>
            <span className='border-r-1 border-gray-200'></span>
            <div id="form" className='border-1 rounded-md border-gray-200 w-[45%] px-8 py-2 md:px-8'>
                <h1 className='my-8 text-center lilita-font font-semibold text-slate-900 text-5xl md:text-4xl'>Log in</h1>
                <form onSubmit={HandleLogin}> 
                    <div className="mb-12 flex flex-col space-y-2">
                        <label className='oswald-font mb-2 font-semibold text-slate-900 text-lg'>Email Or Username</label>
                        <input 
                            type="text" 
                            className='border-2 rounded-md border-gray-200 h-12' 
                            onChange={(e) => {
                                setformData({...formData,identifier:e.target.value});
                                setErrors(prevError => ({...prevError,identifier:''}))
                            }}
                        />
                        {Errors ? <p className='text-red-600'>{Errors.identifier}</p> : ''}
                    </div>
                    <div className="mb-12 flex flex-col space-y-2">
                        <label className='oswald-font mb-2 font-semibold text-slate-900 text-lg'>Password</label>
                        <input 
                            type="password" 
                            className='border-2 rounded-md border-gray-200 h-12' 
                            onChange={(e) => {
                                setformData({...formData,password:e.target.value});
                                setErrors(prevError => ({...prevError,password:''}))
                            }}
                        />
                        {Errors ? <p className='text-red-600'>{Errors.password}</p> : ''}
                    </div>
                    <div className='mb-15 flex space-x-3 items-center'>
                        <input type="checkbox" className='w-6 h-6'/>
                        <label className='oswald-font font-semibold text-sm text-slate-900'>I agree to the Terms & Conditions</label>
                    </div>
                    <button className='w-full lilita-font rounded-md cursor-pointer bg-slate-700 transition-all duration-300 hover:bg-slate-900 py-3 text-lg text-white'>Log in</button>
                </form>
                <div id='register' className='my-10 flex xl:text-lg md:text-[13px]'>
                    <p className='lilita-font'>New To TickTrove?</p>
                    <Link to="/register" className='lilita-font underline'>Create a free account now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;