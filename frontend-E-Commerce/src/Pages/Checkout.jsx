import { useSelector } from "react-redux"
import Payment from "../Components/Payment";
import { Link } from "react-router-dom";

export default function Checkout() {
    const cartItems = useSelector(state => state.cartData.cartItems);
    console.log(cartItems)

    const TotalAllPrice = cartItems.reduce((total,item) => {
        return total + item.totalPrice;
    },0)

    const TotalWithDelivery = TotalAllPrice + 50.66;

    return(
        <section className="my-6 border-t-2 border-gray-100 py-10">
            <h1 className="text-center poppins-light text-slate-900 text-5xl">Order Summary</h1>
            <div id="checkout-details" className="container mx-auto xl:px-16 md:px-8 sm:px-8 py-4 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between space-x-6">
                <div id="my-bag" className="border-1 border-gray-300 py-4  my-6 xl:w-[50%] lg:w-[50%] md:w-full sm:w-full h-[395px] rounded-md overflow-y-scroll">
                    <h1 className="poppins-black text-slate-900 text-2xl py-2 text-center px-4">My Bag</h1>
                    <div className="border-y-1 border-gray-300 mt-2 py-3 space-y-2 space-x-8 px-4">
                        {cartItems && cartItems.map(item => {
                            return <div id="product" className="py-2">
                                {item.watches.map(product => {
                                    return <div id="product-details" className="flex justify-between space-x-4">
                                        {product.detail_image.length > 0 ? product.detail_image.map(img => {
                                            return <img key={img.id} className="w-[150px] h-[160px]" src={`http://localhost:1337${img.url}`}  />
                                        }) : 'No Image Found'}
                                        <div id="details" className="space-y-3 py-2 w-[65%]">
                                            <h1 className="poppins-black underline">Cart Num {item.id}</h1>
                                            <h2 className="poppins-light text-gray-500">{product.title}</h2>
                                            <p className="poppins-light"><span className="text-gray-400">Coleur</span>: Silver</p>
                                            <div className="flex space-x-2">
                                                <p className="poppins-light"><span className="text-gray-400">Size</span>: 35.5</p>
                                                <p className="poppins-light">Qty: <span className="text-gray-400">{item.quantite}</span></p>
                                            </div>
                                            <p className="pt-4 poppins-light text-right">${item.totalPrice}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                    <div id="all-info-price" className="px-4 py-2 space-y-2">
                        <div id="subtotal" className="flex justify-between poppins-light">
                            <h1 className="">Subtotal</h1>
                            <p>${TotalAllPrice}</p>
                        </div>
                        <div id="delivery" className="flex justify-between poppins-light">
                            <h1 className="">Delivery</h1>
                            <p>${50.66}</p>
                        </div>
                        <div id="total" className="flex justify-between poppins-black">
                            <h1 className="">TOTAL</h1>
                            <p>${TotalWithDelivery}</p>
                        </div>
                    </div>
                </div>
                <div id="payments" className="border-1 border-gray-300 rounded-md my-6 h-fit xl:w-[40%] lg:w-[40%] md:w-full sm:w-full">
                    <h1 className="poppins-black text-2xl text-center py-5 px-4 text-slate-900">Payment</h1>
                    <div id="payment" className="border-t-1 border-gray-300 px-8 py-6">
                            <Payment />
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