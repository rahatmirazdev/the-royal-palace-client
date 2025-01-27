import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isExpiryComplete, setIsExpiryComplete] = useState(false);
    const [isCvcComplete, setIsCvcComplete] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardNumber = elements.getElement(CardNumberElement);
        if (!cardNumber) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber,
        });

        if (error) {
            console.error(error);
        } else {
            console.error(paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4 w-[280px] sm:w-[400px] md:[500px] mx-auto">
            <div>
                <CardNumberElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <div>
                <CardExpiryElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <div>
                <CardCvcElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || !isCardComplete || !isExpiryComplete || !isCvcComplete}
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;