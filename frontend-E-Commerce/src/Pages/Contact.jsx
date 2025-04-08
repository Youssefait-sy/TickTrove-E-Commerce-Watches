import { useState } from 'react';
import ContactImg from '../assets/Contact/Contact.jpg';
import ContactForm from '../assets/Contact/ContactForm.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Contact = () => {

    const [formData,setformData] = useState({
        name:'',
        email:'',
        message:''
    })
    const [isLoading,setloading] = useState(false);


    const HandleContact = async(e) => {
        e.preventDefault();
        setloading(true);

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            alert('All fields are required!');
            setloading(false);
            return;
        }else{
            alert('Messege Sent Successfuly');
        }
        
        try {
            const res = await fetch('/api/contacts',{
                method:'POST',
                body:JSON.stringify({
                    data:formData
                })
            });

            if (!res.ok) {
                throw new Error('Failed to send message.');
            }

            setformData({name:'',email:'',message:''})
        } catch (error) {
            console.error(error);
        }finally {
            setloading(false); // Always stop loading after request
        }
    }

    return (
        <section>
            <div id="about-above" className="flex justify-between items-center my-8 px-20 md:px-10 sm:px-10 py-16 bg-slate-900">
                <div id="content-conatct" className="text-white space-y-6">
                    <h1 className="poppins-black xl:text-7xl lg:text-6xl md:text-4xl sm:text-3xl">Do You Have Any Questions?</h1>
                    <p className='poppins-light xl:text-2xl md:text-xl sm:text-[16px]'>We Would Be Glad To Help.</p>
                </div>
                <div id="img-contact">
                    <img src={ContactImg} alt="img-contact" className='rounded-2xl xl:w-[800px] lg:w-[600px] md:w-[400px] sm:w-[400px]' />
                </div>
            </div>
            <div id='contact-form' className='container mx-auto px-20 my-14 space-y-10'>
                <h1 className='text-slate-900 text-center euphoria-font-bold lg:text-5xl md:text-4xl sm:text-[32px] sm:mb-0 md:mb-0 lg:my-15'>Stay in Touch with TickTrove</h1>
                <div id='form-info' className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-3'>
                    <div id='img-form' className=''>
                        <img src={ContactForm} alt="contact-img" className='xl:w-[600px] lg:h-[550px] md:w-full' />
                    </div>        
                    <div id='form' className='border-1 rounded-md border-gray-200 px-8 py-2 md:px-8'>
                    <h1 className='my-4 text-center lilita-font font-semibold text-slate-900 text-5xl md:text-4xl'>Contact</h1>
                        <form onSubmit={HandleContact}> 
                            <div className="mb-6 flex flex-col space-y-2">
                                <label className='oswald-font mb-2 font-semibold text-slate-900 text-lg'>Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    className='border-2 rounded-md border-gray-200 h-12' 
                                    onChange={(e) => {
                                        setformData({...formData,name:e.target.value});
                                    }}
                                />
                            </div>
                            <div className="mb-6 flex flex-col space-y-2">
                                <label className='oswald-font mb-2 font-semibold text-slate-900 text-lg'>Email</label>
                                <input 
                                    type="text" 
                                    value={formData.email}
                                    className='border-2 rounded-md border-gray-200 h-12' 
                                    onChange={(e) => {
                                        setformData({...formData,email:e.target.value});
                                    }}
                                />
                            </div>
                            <div className='mb-6 flex flex-col space-x-3'>
                                <label className='oswald-font font-semibold text-sm text-slate-900'>Message</label>
                                <textarea
                                    value={formData.message}
                                    className='h-12 border-2 rounded-md border-gray-200'
                                    onChange={(e)=>{
                                        setformData({...formData,message:e.target.value});
                                    }}
                                />
                            </div>
                            <button className='w-full lilita-font mb-4 rounded-md cursor-pointer bg-slate-700 transition-all duration-300 hover:bg-slate-900 py-3 text-lg text-white'>
                                {isLoading ? 'Sending...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div id='contact-detail' className='container mx-auto px-20 py-10 space-y-10'>
                <h1 className='text-slate-900 euphoria-font-bold text-center text-5xl'>TickTrove Contact Details</h1>
                <div id='details' className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-14 gap-8'>
                    <div id='adresse' className='space-x-2 text-center flex flex-col space-y-4'>
                        <FontAwesomeIcon icon={faLocationDot} className='text-4xl text-slate-900'>Address</FontAwesomeIcon>
                        <p className='lilita-font leading-7 text-lg'>Salam Neighborhood, <br /> Agadir City Morocco</p>
                    </div>
                    <div id='rmeil' className='space-x-2 text-center flex flex-col space-y-4'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-4xl text-slate-900'></FontAwesomeIcon>
                        <a href='mailto:support@ticktrove.com' className='lilita-font text-xl'>support@ticktrove.com</a>
                    </div>
                    <div id='adresse' className='space-x-2 text-center flex flex-col space-y-4'>
                        <FontAwesomeIcon icon={faPhone} className='text-4xl text-slate-900'></FontAwesomeIcon>
                        <p className='lilita-font text-xl'>+212528334936</p>
                    </div>
                </div>
                <div id='other-contact' className='grid lg:grid-cols-2 gap-6 space-y-6 text-center'>
                    <div id='products' className='space-y-3'>
                        <FontAwesomeIcon icon={faShoppingBag} className='text-slate-900 text-8xl'></FontAwesomeIcon>
                        <h1 className='text-slate-900 poppins-black text-2xl'>Explore Products</h1>
                        <p className='lilita-font text-md'>Check The Link Bellow For Explore TickTrove Products</p>
                        <button className='poppins-black uppercase border-2 px-6 rounded-2xl py-2 text-xl hover:bg-slate-900 hover:text-white transition-colors duration-700'>
                            <Link to={'/products'}>Our Models</Link>
                        </button>
                    </div>
                    <div id='about-us' className='space-y-3'>
                        <FontAwesomeIcon icon={faUsers} className='text-slate-900 text-8xl'></FontAwesomeIcon>
                        <h1 className='text-slate-900 poppins-black text-2xl'>Learn More About Us</h1>
                        <p className='lilita-font text-md'>Take a look behind the scenes and learn more about TickTrove.</p>
                        <button className='poppins-black uppercase border-2 px-6 rounded-2xl py-2 text-xl hover:bg-slate-900 hover:text-white transition-colors duration-700'>
                            <Link to={'/about'}>About Us</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;