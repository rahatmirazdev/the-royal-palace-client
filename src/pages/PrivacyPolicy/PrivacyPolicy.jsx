import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h1>
                <div className="border-b border-gray-200 mb-6"></div>

                <div className="space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Introduction</h2>
                        <p>At The Royal Palace, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services as a resident or prospective resident.</p>
                        <p className="mt-3">Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Information We Collect</h2>
                        <p className="mb-3">We may collect the following types of information:</p>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Personal Information</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Mailing address and residential address</li>
                            <li>Date of birth</li>
                            <li>National ID or passport information</li>
                            <li>Employment information</li>
                            <li>Financial information for payment processing</li>
                            <li>Emergency contact information</li>
                            <li>Profile pictures (if uploaded)</li>
                        </ul>

                        <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Non-Personal Information</h3>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>IP address</li>
                            <li>Device information</li>
                            <li>Usage data and browsing patterns</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">How We Collect Information</h2>
                        <p className="mb-3">We collect information through various methods, including:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Direct Interactions:</strong> Information you provide when you register an account, fill out forms, correspond with us, or use our services.</li>
                            <li><strong>Automated Technologies:</strong> Information collected automatically through cookies, web beacons, and similar tracking technologies when you use our website.</li>
                            <li><strong>Third Parties:</strong> Information we may receive from third parties, such as business partners, credit bureaus, or verification services.</li>
                            <li><strong>Public Sources:</strong> Information that is publicly available.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">How We Use Your Information</h2>
                        <p className="mb-3">We may use the information we collect for various purposes, including:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Processing rental applications and screening potential residents</li>
                            <li>Managing resident accounts and leases</li>
                            <li>Processing payments and maintaining payment records</li>
                            <li>Providing and maintaining our services</li>
                            <li>Responding to inquiries and providing customer support</li>
                            <li>Sending service-related notifications and updates</li>
                            <li>Sending marketing and promotional communications (with your consent)</li>
                            <li>Improving our website, services, and resident experience</li>
                            <li>Conducting data analysis and research</li>
                            <li>Ensuring the security and integrity of our services</li>
                            <li>Complying with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Disclosure of Your Information</h2>
                        <p className="mb-3">We may disclose your information to the following parties:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing, maintenance services, and IT support.</li>
                            <li><strong>Business Partners:</strong> Companies we collaborate with to offer certain services or promotions.</li>
                            <li><strong>Legal Authorities:</strong> Law enforcement agencies, courts, or regulatory bodies when required by law.</li>
                            <li><strong>Business Transfers:</strong> Parties involved in a merger, acquisition, or sale of our assets.</li>
                            <li><strong>With Your Consent:</strong> Any other third parties with your explicit consent.</li>
                        </ul>
                        <p className="mt-3">We do not sell your personal information to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Data Retention</h2>
                        <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the retention period, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Your Privacy Rights</h2>
                        <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, which may include:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>The right to access and receive a copy of your personal information</li>
                            <li>The right to rectify or update inaccurate or incomplete information</li>
                            <li>The right to delete your personal information</li>
                            <li>The right to restrict or object to the processing of your information</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent at any time</li>
                            <li>The right to complain to a data protection authority</li>
                        </ul>
                        <p className="mt-3">To exercise any of these rights, please contact us using the information provided at the end of this policy.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Cookies and Similar Technologies</h2>
                        <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to provide you with a better user experience. You can manage your cookie preferences through your browser settings.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Children's Privacy</h2>
                        <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date, and the revised policy will be effective as of that date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-blue-600 mb-3">Contact Us</h2>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
                        <p className="mt-2">
                            <strong>Email:</strong> privacy@royalpalace.com<br />
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

export default PrivacyPolicy;