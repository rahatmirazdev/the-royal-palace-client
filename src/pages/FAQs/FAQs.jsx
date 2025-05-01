import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What amenities are included with the apartments?",
            answer: "Our luxury apartments include high-speed WiFi, climate control, 24/7 concierge service, access to our swimming pool, fitness center, and dedicated parking. All units feature modern appliances, marble countertops, and premium finishes."
        },
        {
            question: "How do I submit a maintenance request?",
            answer: "Maintenance requests can be submitted through your resident portal account. For urgent matters, please contact our 24/7 concierge desk at +880 1711-123456."
        },
        {
            question: "What is the application process for new residents?",
            answer: "The application process begins with browsing available apartments on our website, selecting your preferred unit, and submitting an application. Our management team will review your application, conduct necessary background checks, and notify you of approval. Upon approval, you'll be invited to sign a rental agreement and make the initial payment."
        },
        {
            question: "Are utilities included in the rent?",
            answer: "Basic utilities including water, garbage, and building maintenance are included in the monthly rent. Electricity, internet, and cable TV are the responsibility of the resident."
        },
        {
            question: "Is parking available for residents?",
            answer: "Yes, each apartment comes with one dedicated parking space in our secure underground parking facility. Additional parking spaces may be available for an extra monthly fee, subject to availability."
        },
        {
            question: "What is the policy on pets?",
            answer: "The Royal Palace is pet-friendly. We allow up to two pets per apartment with a one-time pet deposit. Breed and weight restrictions may apply. Please contact our management office for specific details."
        },
        {
            question: "How long are the lease terms?",
            answer: "Standard lease terms are 12 months. We also offer 6-month and 24-month options with different pricing structures. Please contact our leasing office for more information about our flexible leasing options."
        },
        {
            question: "Is there guest parking available?",
            answer: "Yes, we have designated guest parking spaces available on a first-come, first-served basis. Guests must register their vehicles with the concierge desk upon arrival."
        },
        {
            question: "How do I pay my rent?",
            answer: "Rent can be paid online through your resident portal, by bank transfer, or at the management office. We offer automatic payment options for convenience. Late payments are subject to fees as outlined in your lease agreement."
        },
        {
            question: "What security measures are in place?",
            answer: "The Royal Palace features 24/7 security personnel, CCTV monitoring throughout common areas, secure access systems, and emergency response protocols. Our building is designed with resident safety as a top priority."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Find answers to the most common questions about The Royal Palace residences.
                </p>
            </div>

            <div className="space-y-6 mt-8">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        <button
                            className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                            {activeIndex === index ?
                                <FaChevronUp className="h-5 w-5 text-blue-500" /> :
                                <FaChevronDown className="h-5 w-5 text-gray-400" />
                            }
                        </button>
                        <div className={`px-6 pt-0 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'pb-6 max-h-96' : 'max-h-0'}`}>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;