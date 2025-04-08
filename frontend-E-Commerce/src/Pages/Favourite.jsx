import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RemoveFavourite } from "../Config/favouriteSlice";
import { addToCart } from "../Config/cartSlice";

export default function Favourite(){
    const items = useSelector(state => state.favData.items);
    const user = useSelector(state => state.userData.user);
    const token = useSelector(state => state.userData.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cartData.cartItems);
    const favCount = useSelector(state => state.favData.favCount);
    const cartCount = useSelector(state => state.cartData.cartCount);
    console.log(items)

    const HandleCart = ({watchId,FavId}) => {

        if(user){
            dispatch(addToCart({productId:watchId , userId:user?.id , token}))
            dispatch(RemoveFavourite({FavId:FavId,token}))
        }
    }

    return(
        <section className="bg-gray-100 my-6 border-t-2 border-gray-100">
            <div id="favourites" className="container mx-auto py-14 px-12">
                {user || items.length > 0 ? 
                <h1 className="poppins-light text-2xl">{items.length} Favourites In Listing</h1>
                :'No Favourite In Listing'}
                <div id="list-fav" className="grid xl:grid-cols-3  lg:grid-cols-2 py-6 gap-5">
                    {items  && items.length > 0 ?
                     items.map(item => {
                        return <div key={item.id} id="watch-detail" className="bg-white space-x-1 px-2 py-6 flex lg:text-xl md:text-2xl ">
                            <div key={item.watch?.id} id="img-fav">
                                    {item.watch?.detail_image && item.watch.detail_image.length > 0 ?
                                     item.watch.detail_image.map(img => {
                                        return <img key={img.id} className="lg:w-35 md:w-60 md:h-55 lg:h-45" src={`http://localhost:1337${img.url}`} alt="img-detail" />
                                    }): 'No Image Found'}
                            </div>
                            <div id="watch-detail" className="space-y-2">
                                <h1 className="poppins-light underline">Favourite Num {item.id}</h1>
                                <h2 className="poppins-black text-lg">{item.watch?.title}</h2>
                                <p className="text-lg euphoria-font-bold">{item.watch?.price}$</p>
                                <strong className="poppins-black text-lg">Size:</strong><br />
                                <select name="" className="border-2 border-slate-800 my-3 euphoria-font px-14 text-lg py-0.5">
                                    <option value="">38.5mm</option>
                                </select>
                                <div id="move-remove" className="my-3 space-y-3">
                                    <Link to={'/product/cart'}>
                                        <button onClick={()=>HandleCart({watchId:item.watch.id,FavId:item.documentId})} className="space-x-2 text-md flex items-center cursor-pointer">
                                            <i class="ri-handbag-line text-2xl"></i>
                                            <a href="" className="poppins-light">Move To Bag</a>
                                        </button>
                                    </Link>
                                    <button onClick={()=>dispatch(RemoveFavourite({FavId:item.documentId,token}))} className="flex space-x-2 mt-3 items-center cursor-pointer">
                                        <i class="ri-delete-bin-line text-2xl"></i>
                                        <p className="text-md poppins-light cursor-pointer">Remove Favourite</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }):'No Favourites Found'}
                </div>
            </div>
        </section>
    )
}