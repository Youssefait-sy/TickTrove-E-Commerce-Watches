import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeImg from '../assets/Home/Home.png';
import Buyer from '../assets/Home/Buyer.jpg';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { fetchWatch } from '../Config/watchSlice';

const Home = () => {
    const limit = 8;
    const dispatch = useDispatch();
    const watchs = useSelector(state => state.watchData.watchs);

    useEffect(()=>{
        dispatch(fetchWatch(limit));
    },[dispatch])

    return(
        <section className='my-14'>
            <div id='home-content' className=''>
                <motion.div
                id='img'
                className='w-full overflow-hidden relative flex justify-center items-center'
                viewport={{once:false,amount:0.5}}
                >
                    <motion.img 
                        src={HomeImg} 
                        className='w-full h-full'
                        alt="home"
                        initial={{scale:1}}
                        whileInView={{ scale: 1.3 }} 
                        transition={{duration:10,ease:"easeOut",repeat:Infinity,repeatType:"reverse",delay:1.5}}
                    />
                </motion.div> 
            </div>
            <div id='content' className='container mx-auto absolute xl:top-50 xl:px-20 sm:top-45 sm:px-6 md:top-50 md:px-14 lg:top-50 lg:px-15 flex flex-col justify-center items-start'>
                <p className='text-white poppins-light uppercase xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl'>Special Promo Sale</p>
                <h1 className='text-white hammersmith-font font-bold uppercase sm:text-[60px] sm:leading-16 md:text-[70px] md:leading-20 lg:text-[90px] xl:text-[120px] xl:leading-28 w-max'>Timeless <br /> Elegance</h1>
                <button className='bg-transparent lg:mt-6 lg:py-6 px-8 py-6 xl:text-4xl sm:text-xl sm:mt-3 sm:-mb-8 sm:py-4 sm:px-4 lg:text-3xl md:text-xl lg:px-7 md:px-5 md:py-4 md:mt-4 border text-white  border-white hammersmith-font uppercase hover:bg-white hover:text-slate-900 transition-colors cursor-pointer duration-700'>
                    <Link to={'/products'}>Explore Our Products</Link>
                </button>
                <p className='text-white lg:my-20 sm:my-12 md:mt-12 poppins-light lg:text-4xl'>@TickTrove</p>
            </div>
            <div id='populare-content' className='container mx-auto space-y-12 px-10 my-15'>
                <h1 className='text-4xl text-center md:text-3xl poppins-black text-slate-900'>Our Most Popular Models</h1>
                <div id='box-watch' className='flex flex-wrap justify-center items-center w-full gap-4'>
                    {watchs.data && watchs.data.length > 0 ?
                    watchs.data.map(watch => {
                        return <div id='card' key={watch.id} className='xl:w-[23%] lg:w-[31%] md:w-[45%] bg-gray-100 rounded-xl shadow-2xl shadow-zinc-500 transition-colors duration-700 hover:bg-slate-900 hover:cursor-pointer hover:text-white'>
                                <Link to={`/product/detail/${watch.id}`} className="z-10">
                                <div id='image' className=''>
                                    {watch.detail_image && watch.detail_image.length > 0 ?
                                    watch.detail_image.map((image) => {
                                        return <img key={image.id} className='w-[300px] h-[350px]' src={`http://localhost:1337${image.url}`} alt={`Image of ${image.name}`} />
                                    })
                                    : 'No Image'}
                                </div>
                                <div id='content-populaire' className='px-6 py-3'>
                                    <h1 className='poppins-light'>{watch.brand.title}</h1>
                                    <p className='poppins-black lg:truncate'>{watch.title}</p>
                                </div>
                                </Link>
                        </div>
                    }) : 'No data'}
                </div>
            </div>
            <div id='buyer-protection' className='container mx-auto space-y-4 my-16 shadow-2xl'>
                <h1 className='text-slate-900 text-center poppins-black md:text-5xl text-6xl'>Why Shop with Tick Trove?</h1>
                <p className='text-black text-center uppercase font-bold text-[15px] md:text-[14px] poppins-light'>Your trust is our priority - here's how we protect your purchase!</p>
                <div id='buyer-box' className='flex justify-center lg:my-12'>
                    <div id='content-box' className='w-[45%] h-[600px] xl:space-y-6 md:space-y-2 lg:space-y-4 bg-slate-900 px-12 py-14 md:py-10 rounded-l-xl'>
                        <h1 className='poppins-black text-4xl lg:text-[27px] md:text-lg text-white'>Tick Trove Buyer Protection</h1>
                        <ul className='space-y-10 md:space-y-6 lg:space-y-6 lg:text-[21px] md:text-[16px] md:px-1 lg:px-2 text-2xl text-white px-6 py-2'>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                All watches are 100% authentic and verified by experts.
                            </li>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                Commitment to Authenticity
                            </li>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                Global money-back guarantee
                            </li>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                Strict dealer guidelines
                            </li>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                Insured shipments
                            </li>
                            <li className='poppins-light'>
                                <i class="ri-check-line text-xl"></i>
                                TickTrove's quality & security team
                            </li>
                        </ul>
                        <div id='contact' className='px-20 lg:px-10 md:px-4 w-full mt-3'>
                            <button className='text-white lg:text-3xl md:text-2xl  font-bold poppins-black uppercase border hover:bg-white hover:text-slate-900 transition-colors duration-700 cursor-pointer border-white px-20 lg:px-10 md:px-6 py-4'>
                                <Link to={'/contact'}>Contact Us</Link>
                            </button>
                        </div>
                    </div>
                    <div id='img' className='w-[45%]'>
                        <img src={Buyer} alt="buyer" className='h-[600px] w-full rounded-r-xl' />
                    </div>
                </div>
            </div>
            <div id='straps-watch' className='container mx-auto text-center space-y-10 my-16'>
                <h1 className='poppins-light uppercase text-xl'>Watch Straps</h1>
                <h2 className='poppins-light uppercase text-5xl lg:text-4xl md:text-3xl text-slate-900'>Made By Hand For Every Kind Of Wrist</h2>
                <p className='px-64 lg:px-60 md:px-44 poppins-black'>Switching out your strap is a fast and easy way to give your TICKTROVE a personal makeover. You can fix a strap to suit the season, the occasion - or even your ever-changing moods. Start your search now and discover the playful side of Swiss precision.</p>
                <button className='relative border text-2xl border-slate-900 px-10 py-3 uppercase poppins-light hover:text-white cursor-pointer hover:-translate-y-2 transition-colors duration-700 hover:bg-slate-900'>
                    <Link to={'/products'}>Shop The Collection</Link>
                </button>
            </div>
        </section>
    )
}

export default Home;