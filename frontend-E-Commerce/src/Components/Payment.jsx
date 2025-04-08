import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements,CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51R7FJz4GNuLfFk6LCm64LREpT9Q4bpi7HWbOH8iH6kDaBxKTEJ1thPrJf8WswiZ9cbU7Y041EuRAFQD6UtoxZIoY00kpVut6pl");

const CheckoutForm = () => {
    const stripe = useStripe();
    const element = useElements();
    const [loading,setloading] = useState(false);

    const cartItems = useSelector(state => state.cartData.cartItems);
    console.log(cartItems)

    const TotalAllPrice = cartItems.reduce((total,item) => {
        return total + item.totalPrice;
    },0)
    const user = useSelector(state => state.userData.user);
    const token = useSelector(state => state.userData.token);
    const TotalWithDelivery = TotalAllPrice + 50.66;

    const HandleSubmit = async(e) => {
        e.preventDefault();
        setloading(true);

        if(!stripe || !element) return;

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        const {paymentMethod , error} = await stripe.createPaymentMethod({
            type: 'card',
            card:cardNumberElement
        })

        if(error){
            console.error(error);
            setloading(false)
        }else{
            const response = await fetch('/api/payments',{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify({
                    data:{
                        paymentMethodId:paymentMethod.id,
                        amount:TotalWithDelivery,
                        currency:"usd",
                        users_permissions_user:user?.id
                    }
                    
                })
            })
            const paymentResult = await response.json();
            console.log(response);
            setloading(false);
        }

       
        
    }

    const cardOptions = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Roboto", sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    return(
        <form onSubmit={HandleSubmit}>
            <div className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="cardNumber" className="font-semibold text-xl poppins-light text-slate-900">
                        Card Number
                    </label>
                    <CardNumberElement id="cardNumber"  className="border-1 border-gray-300 rounded-sm w-full px-4 py-4"/>
                </div>

                <div className="flex flex-row gap-4 justify-between">
                    <div className="flex flex-col gap-2 w-[50%]">
                        <label htmlFor="expiration" className="font-semibold text-slate-900 text-xl poppins-light">
                            Expiration Date
                        </label>
                        <CardExpiryElement id="expiration" className="border-1 border-gray-300 rounded-sm w-full px-4 py-4" />
                    </div>
                    <div className="flex flex-col gap-2 w-[50%]">
                        <label htmlFor="cvc" className="font-semibold text-slate-900 text-xl poppins-light">
                            CVC
                        </label>
                        <CardCvcElement id="cvc" className="border-1 border-gray-300 rounded-sm w-full px-4 py-4" />
                    </div>
                </div>
                <button type="submit" disabled={!stripe || loading} className="bg-slate-800 transition-colors duration-700 cursor-pointer hover:bg-slate-900 px-4 py-3 w-full text-white poppins-black text-xl rounded-sm">
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </form>
    )
}

export default function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}