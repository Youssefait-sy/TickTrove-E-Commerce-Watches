import { useDispatch, useSelector } from 'react-redux';
import ProductsImg from '../assets/Products/ProductImg.jpg';
import { useEffect, useState } from 'react';
import { fetchAllWatchs , fetchBrands, setFiltred } from '../Config/watchSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDollarSign , faCircleInfo , faCartPlus , faFilter } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart (filled)
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AddToFavourite, RemoveFavourite, touggleFavourite } from '../Config/favouriteSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addToCart } from '../Config/cartSlice';

const Products = () => {

    const AllWatchs = useSelector(state => state.watchData.Allwatchs);
    const token = useSelector(state => state.userData.token);
    const brands = useSelector(state => state.watchData.brands);
    const myFiltredWatchs = useSelector(state => state.watchData.FiltredWatchs);
    const loading = useSelector(state => state.watchData.loading);
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const favouriteWatchs = useSelector(state => state.favData.isFavourite);
    const [searchItem,setsearchItem] = useState("");
    // console.log(token)
    
    const HandleSearch = () => {

        if (!searchItem.trim()) {
            dispatch(setFiltred(AllWatchs)); 
            return;
        }
        const FiltredWatch = AllWatchs.filter(watch => {
            return new RegExp(searchItem,"i").test(watch.title)
        })
        dispatch(setFiltred(FiltredWatch))
        
    }

    const HandleBrands = (brand) => {
        const FilterdbyBrand = AllWatchs.filter(watch => {
            return watch.brand?.title === brand;
        })
        dispatch(setFiltred(FilterdbyBrand))
    }

    const HandleFavourite = (id) => {
        const isFavourite = favouriteWatchs[id] || false;
        if(user){
            dispatch(touggleFavourite(id))
        }else {
            navigate('/login')
        }
        if(!isFavourite && user){
            dispatch(AddToFavourite({ productId: id, userId:user?.id , token }))
        }
        
    }

    const HandleCart = (id) => {
        if(user && user?.id){
            dispatch(addToCart({productId:id , userId:user?.id , token}))
        }
    }

    useEffect(() => {
        HandleSearch();
    }, [searchItem]);


    return(
        <main className='my-10'>
            <div id="product-img">
                <img src={ProductsImg} alt="product-img" />
            </div>
            <div id='products' className='container mx-auto py-14 space-y-12 lg:px-16 md:px-6 sm:px-6'>
                <h1 className='euphoria-font-bold text-slate-900 text-center xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl'>Masterpiece On Your Wrist</h1>
                <p class="text-gray-700 poppins-light text-center text-xl xl:px-32 lg:px-28 md:px-14 sm:px-0">We offer a wide variety of watches from the most trusted brands. Whether you're looking for a sleek design or a rugged timepiece, we have something for everyone.</p>
                <fieldset className='border-2 px-4 py-6 border-slate-900 rounded-md'>
                    <legend className='poppins-black text-slate-900 text-2xl'>Filter by Brand & Search for Watches</legend>
                    <div id='serach-filter' className='flex md:flex-col sm:flex-col lg:flex-row justify-between  space-y-3'>
                    <div id='filter-brand' className='xl:w-[75%] lg:w-[70%] md:w-full sm:w-full space-x-2'>
                        <button onClick={() => dispatch(setFiltred(AllWatchs))} className='bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 transition-colors duration-700 hover:text-white text-xl cursor-pointer euphoria-font-bold rounded-lg px-2 py-2'>All</button>
                        {brands && brands.map(brand => {
                           return <button key={brand.id} onClick={() => HandleBrands(brand.title)} className='bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 transition-colors duration-700 hover:text-white text-xl sm:text-lg cursor-pointer euphoria-font-bold rounded-lg xl:px-5 lg:px-1 md:px-2 sm:px-1 py-2'>
                                {brand.title}
                            </button>
                        })}
                    </div>
                    <div id='search' className='xl:w-[30%] md:w-full sm:w-full lg:w-[25%]'>
                        <input type="text" onChange={(e) => {
                                setsearchItem(e.target.value);
                            }} 
                            placeholder='Search For Your Watchs' className='border-2 rounded-md border-slate-900 h-12 w-full' 
                        />
                    </div>
                </div>
                </fieldset>
                <h1 className='mb-3 space-y-0 text-slate-900 poppins-black'><strong>{myFiltredWatchs.length} Listing</strong> Including All Brands</h1>
                <div id='product-list' className='grid xl:grid-cols-3 md:grid-cols-2 gap-8'>
                    {loading ? <p className='text-slate-900 poppins-black text-xl'>Loading...</p> : (myFiltredWatchs && myFiltredWatchs.length > 0 ?
                     myFiltredWatchs.map(watch => {
                        const isFavourite = favouriteWatchs[watch.id] || false
                        return <div id='card-watch' key={watch.id} className='border-x-1 border-b-1 border-gray-300 rounded-xl overflow-hidden'>
                            {watch.mockup_image && 
                            watch.mockup_image.map(img => {
                                return <div 
                                            key={img.id} 
                                            id='card' 
                                            className="overflow-hidden"   
                                        >
                                    <motion.img
                                        src={`http://localhost:1337${img.url}`} 
                                        alt='img-mockup' 
                                        className='w-full object-cover rounded-t-xl h-[370px] cursor-pointer'
                                        whileHover={{
                                            scale:1.2,
                                            borderRadius:'12px'
                                        }}
                                        transition={{
                                            type:'spring',
                                            stiffness:100,
                                            damping:60
                                        }}
                                    />
                                </div>
                            })}
                            <div id='content-card' className='px-5 py-4 space-y-3'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-slate-900 poppins-black text-xl'>{watch.title}</h1>
                                    <button onClick={()=> HandleFavourite(watch.id)} className='text-slate-900 text-2xl cursor-pointer'>
                                        <FontAwesomeIcon icon={isFavourite ? solidHeart : regularHeart} />
                                    </button>
                                </div>
                                <p className='poppins-light text-lg'>{watch.description.substring(0,50)}...</p>
                                <strong className='text-gray-800 euphoria-font-bold text-2xl'>{watch.price}<FontAwesomeIcon icon={faDollarSign}/></strong>
                                <div id='btns' className='mt-4 space-x-4 flex justify-between'>
                                    <button className='bg-slate-800 hover:bg-slate-900 text-white px-4 rounded-3xl space-x-1 cursor-pointer poppins-black'>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                        <Link to={`/product/detail/${watch.id}`}>Details</Link>
                                    </button>
                                    <button onClick={()=>HandleCart(watch.id)} className='bg-gray-200 hover:bg-gray-300 text-slate-900 px-6 py-1 rounded-3xl space-x-1 cursor-pointer poppins-black text-lg'>
                                        <FontAwesomeIcon icon={faCartPlus} />Add
                                    </button>
                                </div>
                            </div>
                        </div>
                     }) : '')}
                </div>
                <div id="call-to-action" class="mt-6 flex justify-between space-x-4 poppins-light text-lg">
                    <Link to="/product/cart" class="bg-blue-600 text-white py-2 px-4 rounded-md">View Cart</Link>
                    <Link to="/about" class="bg-gray-600 text-white py-2 px-4 rounded-md">Explore About Us</Link>
                </div>
            </div>
        </main>
    )
}

export default Products;