import { Link, useNavigate } from 'react-router-dom';
import RegisterLg from '../assets/Register/WatchLogo.jpg';
import RegisterSm from '../assets/Register/WatchLogo1.png';
import { useEffect, useState } from 'react';

const Register = () => {
    const [imageSrc, setImageSrc] = useState(
        window.innerWidth < 993 ? RegisterSm : RegisterLg
    );
    const [formData,setformData] = useState({
        username:'',
        email:'',
        password:''
    })
    const [Errors,setErrors] = useState({username:'',email:'',password:''});
    const navigate = useNavigate();

    const HandleErrors = (data) => {
        if(data?.error?.message){
            let Errorfield = {...Errors};
            switch (true) {
                case data.error.message.includes('username is a required field'):
                    Errorfield.username = data.error.message;
                    break;
                case data.error.message.includes('Email or Username are already taken'):
                    Errorfield.email = data.error.message;
                    break;
                case data.error.message.includes('email must be a valid email'):
                    Errorfield.email = data.error.message;
                    break;
                case data.error.message.includes('email is a required field'):
                    Errorfield.email = data.error.message;
                    break;
                case data.error.message.includes('password is a required field'):
                    Errorfield.password = data.error.message;
                    break;
                default:
                    return 'Something went wrong';
            }
            setErrors(Errorfield)
            console.log(Errorfield);
        }else{
            setErrors({});
        }
    }

    const HandleRegister = async(e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/local/register',{
            method:'POST',
            body:JSON.stringify(formData)
        })

        const data = await res.json();

        if (data.error) {
            HandleErrors(data);
        } else {
            localStorage.setItem('jwt',data.jwt)
            setErrors({})
            navigate('/login')
        }
    }


    useEffect(()=>{
        const Handleresize = () => {
            setImageSrc(window.innerWidth < 993 ? RegisterSm : RegisterLg);
        }
        window.addEventListener('resize',Handleresize);

        return () => window.removeEventListener('resize',Handleresize);
    })

    return(
        <div id="my-login" className="flex my-10 sm:my-4 justify-center space-x-8 w-full md:px-3">
            <div id="img" className='w-[45%] md:w-[40%] lg:mt-0 md:mt-14'>
                <img src={imageSrc} width={600} className='xl:h-[650px] md:h-[500px]' alt="my-login" />
            </div>
            <span className='border-r-1 border-gray-200'></span>
            <div id="form" className='border-1 rounded-md border-gray-200 w-[45%] px-8 py-2 md:px-4'>
                <h1 className='my-4 text-center lilita-font font-semibold text-slate-900 text-5xl md:text-5xl'>Create Account</h1>
                <form onSubmit={HandleRegister}> 
                    <div className="mb-10 flex flex-col space-y-2">
                        <label className='oswald-font font-semibold text-slate-900 text-lg'>Username</label>
                        <input
                            type="text"
                            className='border-2 rounded-md border-gray-200 h-11'
                            onChange={(e) => {
                                setformData({...formData,username:e.target.value});
                                setErrors((prevError => ({...prevError,username:''})))
                            }}
                            
                        />
                        {Errors ? <p className='text-red-600'>{Errors.username}</p> : ''}
                    </div>
                    <div className="mb-10 flex flex-col space-y-2">
                        <label className='oswald-font font-semibold text-slate-900 text-lg'>Email</label>
                        <input
                            type="text" 
                            className='border-2 rounded-md border-gray-200 h-11' 
                            onChange={(e) => {
                                setformData({...formData,email:e.target.value});
                                setErrors((prevError => ({...prevError,email:''})))
                            }}
                        />
                        {Errors ? <p className='text-red-600'>{Errors.email}</p> : ''}
                    </div>
                    <div className="mb-10 flex flex-col space-y-2">
                        <label className='oswald-font font-semibold text-slate-900 text-lg'>Password</label>
                        <input
                             type="password" 
                             className='border-2 rounded-md border-gray-200 h-11' 
                             onChange={(e) => {
                                setformData({...formData,password:e.target.value});
                                setErrors((prevError => ({...prevError,password:''})))
                            }}
                        />
                        {Errors ? <p className='text-red-600'>{Errors.password}</p> : ''}
                    </div>
                    <button className='w-full rounded-md cursor-pointer  bg-slate-700 transition-all duration-300 hover:bg-slate-900 py-3 text-lg text-white lilita-font'>Register for free</button>
                </form>
                <div id='register' className='my-10 flex xl:text-xl md:text-[13px]'>
                    <p className='lilita-font'>Already have an account?</p>
                    <Link to="/login" className='lilita-font underline'>Log in now</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;