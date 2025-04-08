import { useDispatch, useSelector } from "react-redux"
import { addQuantity, minusQuantity, RemoveCarts, UpdateQuantity } from "../Config/cartSlice";
import { Link } from "react-router-dom";
import { AddToFavourite } from "../Config/favouriteSlice";
import { useState } from "react";

export default function Cart() {
    const cartItems = useSelector(state => state.cartData.cartItems);
    const user = useSelector(state => state.userData.user);
    const token = useSelector(state => state.userData.token);
    const dispatch = useDispatch();
    console.log(cartItems);

    return (
        <section className="bg-gray-100 my-6 border-t-2 border-gray-100">
                    <div id="favourites" className="container mx-auto py-14 md:px-18 px-12">
                        {user || cartItems.length > 0 ? 
                        <h1 className="poppins-light text-2xl">{cartItems.length} Products In Listing</h1>
                        :'No Product In Cart Listing'}
                        <div id="list-fav" className="grid xl:grid-cols-2 lg:grid-cols-2 py-6 gap-5">
                            {cartItems && user && cartItems?.length > 0 ?
                             cartItems.map(item => {
                                return <div key={item.id} id="watch-detail" className="bg-white">
                                            {item.watches && item.watches.length > 0 ?
                                             item.watches.map(watch => {
                                                return <div id="watch-details" key={watch.id} className="space-x-12 px-2 py-6 flex">
                                                    <div id="detail-img">
                                                    {watch.detail_image.length > 0 ? watch.detail_image.map(img => <img key={img.id} className="w-60 h-70" src={`http://localhost:1337${img.url}`} alt="img-detail" />):'No Image Found'}
                                                </div>
                                                <div id="info-cart" className="space-y-3 md:text-2xl">
                                                    <h1 className="poppins-light underline text-xl">Product In Cart Num {watch.id}</h1> 
                                                    <h2 className="poppins-black text-[18x]">{watch.title}</h2>
                                                    <strong className="poppins-black text-lg">Size:</strong><br />
                                                    <select name="" className="border-2 border-slate-800 my-3 euphoria-font px-14 text-lg py-0.5">
                                                        <option value="">38.5mm</option>
                                                    </select>
                                                    <div id="move-remove" className="my-3">
                                                        <Link to={'/product/fav'}>
                                                            <button onClick={()=>dispatch(AddToFavourite({ productId: watch.id, userId:user?.id , token }))} className="space-x-2 text-lg flex items-center cursor-pointer">
                                                                <i class="ri-heart-3-line text-2xl"></i>
                                                                <a href="" className="poppins-light">Move To Wish list</a>
                                                            </button>
                                                        </Link>
                                                        <button onClick={()=>dispatch(RemoveCarts({cartId:item.documentId,token}))} className="flex text-lg space-x-2 mt-3 items-center cursor-pointer">
                                                            <i class="ri-delete-bin-line text-2xl"></i>
                                                            <p className="text-md poppins-light cursor-pointer">Remove Cart</p>
                                                        </button>
                                                    </div>
                                                    <div id="add-minus" className="flex items-center space-x-7 mt-4 px-4 border-2 hover:bg-slate-900 duration-700 transition-colors hover:text-white border-slate-900 w-fit">
                                                        <button onClick={()=> {
                                                                dispatch(minusQuantity(item.id));
                                                                setTimeout(() => {
                                                                    const updatedQuantity = item.quantite - 1;
                                                                    const UpdateTotal = item.watches.reduce((total,product) => total + product.price * updatedQuantity,0)
                                                                    dispatch(UpdateQuantity({newQuantity:updatedQuantity,cartId:item.documentId,token,TotalPrice:UpdateTotal}))
                                                                }, 200);
                                                            }} 
                                                            className="text-3xl cursor-pointer px-3"
                                                        >
                                                            <i class="ri-subtract-fill"></i>
                                                        </button>
                                                        <p className="text-xl poppins-light">{item.quantite}</p>
                                                        <button onClick={()=> {
                                                                 dispatch(addQuantity(item.id));
                                                                 setTimeout(() => {
                                                                    const updatedQuantity = item.quantite + 1;
                                                                    const UpdateTotal = item.watches.reduce((total,product) => total + product.price * updatedQuantity,0)
                                                                    dispatch(UpdateQuantity({newQuantity:updatedQuantity,cartId:item.documentId,token,TotalPrice:UpdateTotal}))
                                                                }, 200);
                                                        }} 
                                                        className="cursor-pointer px-3"
                                                        >
                                                            <i class="ri-add-large-line font-bold"></i>
                                                        </button>
                                                    </div>
                                                    <h1 className="text-slate-900 poppins-black mb-1 font-bold text-lg">Total Product Price:</h1>
                                                    <div id="total-price" className="flex space-x-2 poppins-light text-xl"> 
                                                            <h1>{watch.price}</h1>
                                                            <span>x</span>
                                                            <h1>{item.quantite}</h1>
                                                            <span>=</span>
                                                            <p>{item.totalPrice}$</p>
                                                    </div>
                                                </div>
                                            </div>
                                             }) : 'No Product'}
                                            
                                        </div>
                            }):'No Product In Cart Found'}
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <button className="text-xl space-x-1 poppins-light font-bold text-slate-900">
                                <i class="ri-home-4-line text-2xl"></i>
                                <Link to={'/'}>Back To Home</Link>
                            </button>
                            <button className="bg-slate-900 text-white w-50 px-12 hover:border-1 rounded-sm hover:bg-transparent h-11 transition-colors duration-700 hover:text-slate-900 py-1 cursor-pointer text-2xl euphoria-font-bold">
                                <Link to={'/product/checkout'}>Checkout</Link>
                            </button>
                        </div>
                    </div>
        </section>
    )
}

{/* <div id="img-fav">
{watch.length > 0 ? watch.detail_image.map(img => {
    return <div key={watch.id} id="img">
        <img key={img.id} className="w-35 h-45" src={`http://localhost:1337${img.url}`} alt="img-detail" />
    </div>
    }):'No Image Found'}  
</div> 
 <div id="watch-detail" className="space-y-2">
    <h1 className="poppins-light underline">Product In Cart Num {watch.id}</h1> 
    <h2 className="poppins-black text-lg">{watch.title}</h2>
    <p className="text-lg euphoria-font-bold">{watch.price}$</p>
    <strong className="poppins-black text-lg">Size:</strong><br />
    <select name="" className="border-2 border-slate-800 my-3 euphoria-font px-14 text-lg py-0.5">
        <option value="">38.5mm</option>
    </select>
    <div id="move-remove" className="my-3 space-y-3">
        <button className="space-x-2 text-md flex items-center cursor-pointer">
            <i class="ri-handbag-line text-2xl"></i>
            <a href="" className="poppins-light">Move To Bag</a>
        </button>
        <button onClick={()=>dispatch(RemoveFavourite({FavId:watch.documentId,token}))} className="flex space-x-2 items-center cursor-pointer">
            <i class="ri-delete-bin-line text-2xl"></i>
            <p className="text-md poppins-light cursor-pointer">Remove</p>
        </button>
    </div>
</div>
}): 'No Product Item'} */}