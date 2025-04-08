import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart (filled)
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { AddToFavourite, touggleFavourite } from '../Config/favouriteSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../Config/cartSlice";

const ProductDetails = () => {
    const {id} = useParams();
    const Allwatchs = useSelector(state => state.watchData.Allwatchs);
    const user = useSelector(state => state.userData.user);
    const token = useSelector(state => state.userData.token);
    const ProductDetail = Allwatchs.find(watch => watch.id === Number(id))
    const favouriteWatchs = useSelector(state => state.favData.isFavourite);
    const isFavourite = favouriteWatchs[ProductDetail.id] || false
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(ProductDetail);

    const HandleFavourite = (id) => {
        if(user){
            dispatch(touggleFavourite(id))
        }else {
            navigate('/login')
        }
        if(!isFavourite && user){
            dispatch(AddToFavourite({ productId: id, userId:user?.id , token }))
        }
    }

    return(
        <section className="bg-gray-100 my-6 border-t-2 border-gray-300">
            <h1 className="text-center poppins-black text-4xl py-8">{ProductDetail.title} Details</h1>
            <div id="products-details" className="container mx-auto xl:px-14 lg:px-14 md:px-8 sm:px-8 md:space-y-8 sm:space-y-4 space-x-8 md:flex-col sm:flex-col lg:flex-row py-10 flex justify-center xl:border-1 xl:border-gray-300 rounded-md">
                <div id="img-details" className="xl:w-[45%] lg:w-[45%] md:w-full cursor-pointer flex md:justify-center sm:justify-center">
                    {ProductDetail?.detail_image &&  ProductDetail.detail_image.map(product => {
                        return <img key={product.id} className="w-[460px]" src={`http://localhost:1337${product.url}`} alt="my-image" />
                    })}
                </div>
                <span className="border-1 border-gray-300"></span>
                <div id="details" className="xl:w-[55%] lg:w-[45%] md:w-full space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="poppins-black text-xl">{ProductDetail.brand.title}</h1>
                        <button onClick={()=> HandleFavourite(ProductDetail.id)} className='text-slate-900 text-2xl cursor-pointer'>
                            <FontAwesomeIcon icon={isFavourite ? solidHeart : regularHeart} />
                        </button>
                    </div>
                    <h2 className="poppins-black text-2xl">{ProductDetail.title}</h2>
                    <p className="euphoria-font-bold text-xl">{ProductDetail.price}$</p>
                    <strong className="text-xl">Size</strong>
                    <p className="mt-2 border-2 px-16 euphoria-font border-slate-900 hover:bg-slate-900 hover:text-white cursor-pointer transition-colors duration-700 text-lg py-1 w-fit">38.5 mm</p>
                    <div className="flex space-x-2 xl:text-xl justify-center items-center oswald-font font-bold my-5 py-2 bg-gray-200">
                        <i class="ri-time-line text-lg"></i>
                        <p>Running Low - Less Than {Allwatchs.length} Watch Available</p>
                    </div>
                    <button onClick={() => dispatch(addToCart({productId:ProductDetail.id , userId:user?.id , token}))} className="my-5 hover:bg-slate-900 border-2 border-slate-900 transition-colors duration-700  hover:text-white px-12 py-3 w-full text-xl poppins-black cursor-pointer">
                        <Link to={'/product/cart'}>Add To Bag</Link>
                    </button>
                    <div id="desc" className="my-5">
                        <h1 className="poppins-black text-xl pb-2 border-b-2 border-gray-800">Description</h1>
                        <p className="mt-2 poppins-light text-2xl">{ProductDetail.description}</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto xl:px-14 lg:px-10 md:px-8 sm:px-8 flex justify-between items-center py-5">
                <button className="text-xl space-x-1 poppins-light font-bold text-slate-900">
                    <i class="ri-home-4-line text-2xl"></i>
                    <Link to={'/'}>Back To Home</Link>
                </button>
                <button className="poppins-light text-xl space-x-1">
                    <i class="ri-team-line text-2xl"></i>
                    <Link to={'/about'}>About Us</Link>
                </button>
            </div>
        </section>
    )
}

export default ProductDetails;