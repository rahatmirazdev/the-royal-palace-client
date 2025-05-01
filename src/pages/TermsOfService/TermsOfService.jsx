import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Terms of Service</h1>
                <div className="border-b border-gray-200 mb-6"></div>

                <div className="space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">1. Acceptance of Terms</h2>
                        <p>Welcome to The Royal Palace. By accessing or using our website, services, and facilities, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">2. Definitions</h2>
                        <p className="mb-3">Throughout these Terms of Service, the following terms shall have the meanings defined below:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>"The Royal Palace,"</strong> "we," "us," or "our" refers to the residential building management and its affiliates.</li>
                            <li><strong>"Services"</strong> refers to all services provided by The Royal Palace, including apartment rentals, maintenance, amenities, and online services.</li>
                            <li><strong>"User,"</strong> "you," or "your" refers to individuals who access or use our website or services.</li>
                            <li><strong>"Agreement"</strong> refers to the rental agreement between The Royal Palace and tenants.</li>
                            <li><strong>"Website"</strong> refers to the official Royal Palace website and related digital platforms.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">3. Eligibility</h2>
                        <p>To use our services, you must be at least 18 years of age and capable of forming a legally binding contract. By using our services, you represent and warrant that you meet these requirements.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">4. Account Registration</h2>
                        <p className="mb-3">When you register for an account on our website:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>You agree to provide accurate, current, and complete information.</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You are responsible for all activities that occur under your account.</li>
                            <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                        </ul>
                        <p className="mt-3">We reserve the right to suspend or terminate your account if we suspect any unauthorized or fraudulent activity.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">5. Rental Agreements</h2>
                        <p className="mb-3">When you enter into a rental agreement with us:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>The agreement becomes legally binding once accepted by both parties.</li>
                            <li>You agree to pay all rent and fees as stipulated in the agreement.</li>
                            <li>You agree to comply with all building rules and regulations.</li>
                            <li>You acknowledge that violations of the rental agreement may result in termination of tenancy.</li>
                        </ul>
                        <p className="mt-3">The specific terms of your tenancy will be detailed in your rental agreement, which supersedes these general Terms of Service in case of any conflicts.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">6. Payment Terms</h2>
                        <p className="mb-3">By using our payment services:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>You agree to pay all fees and charges associated with your account.</li>
                            <li>You authorize us to charge the payment method you provide for all applicable fees.</li>
                            <li>Late payments may incur additional fees as specified in your rental agreement.</li>
                            <li>All payment disputes must be reported within 30 days of the charge.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">7. Use of Amenities and Facilities</h2>
                        <p className="mb-3">When using The Royal Palace amenities and facilities:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>You agree to use them in accordance with posted rules and regulations.</li>
                            <li>You acknowledge that amenities are provided for the use of residents and their authorized guests only.</li>
                            <li>You accept responsibility for any damage caused by you or your guests.</li>
                            <li>You understand that access to certain amenities may be restricted or modified at management's discretion.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">8. Maintenance and Repairs</h2>
                        <p className="mb-3">Regarding maintenance and repairs:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>You agree to promptly report any maintenance issues or needed repairs.</li>
                            <li>You will allow reasonable access to your apartment for necessary maintenance.</li>
                            <li>You understand that emergency repairs may be performed without prior notice.</li>
                            <li>You acknowledge that routine maintenance may be scheduled with reasonable advance notice.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">9. Prohibited Activities</h2>
                        <p className="mb-3">You agree not to engage in any of the following activities:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Violating any applicable laws or regulations.</li>
                            <li>Infringing on the rights of others, including privacy and intellectual property rights.</li>
                            <li>Engaging in any activity that disrupts the peaceful enjoyment of other residents.</li>
                            <li>Using the premises for illegal purposes or unauthorized commercial activities.</li>
                            <li>Tampering with building systems, including fire safety and security systems.</li>
                            <li>Unauthorized modifications to your apartment or common areas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">10. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by law, The Royal Palace shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or any interactions with other residents. Our total liability for any claims related to these Terms shall not exceed the amount you have paid to us in the preceding six months.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">11. Indemnification</h2>
                        <p>You agree to indemnify, defend, and hold harmless The Royal Palace and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses arising out of or related to your violation of these Terms or your use of our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">12. Changes to Terms</h2>
                        <p>We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new terms on our website and/or sending a notification to the email address associated with your account. Your continued use of our services after such changes constitutes your acceptance of the revised terms.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">13. Governing Law</h2>
                        <p>These Terms are governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of Dhaka, Bangladesh.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">14. Contact Information</h2>
                        <p>If you have any questions about these Terms of Service, please contact us at:</p>
                        <p className="mt-2">
                            <strong>Email:</strong> legal@royalpalace.com<br />
                            <strong>Phone:</strong> +880 1711-123456<br />
                            <strong>Address:</strong> Building 12, Road 5, Block A, Banani, Dhaka 1213, Bangladesh
                        </p>
                    </section>
                </div>

                <div className="text-sm text-gray-500 mt-8 text-center">
                    Last updated: May 1, 2025
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;