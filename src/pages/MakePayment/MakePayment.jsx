import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const MakePayment = () => {

  return (
    <div className="md:w-[1200px] mx-auto p-6 bg-white rounded-lg mt-5 border border-blue-300">
      <h1 className="text-3xl font-bold mb-6 text-center">Make Payment</h1>
      <div className="flex flex-col items-center">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  )
};

export default MakePayment;