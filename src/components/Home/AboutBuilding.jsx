import { FaBuilding, FaShieldAlt, FaStar, FaWifi, FaSwimmingPool, FaConciergeBell } from "react-icons/fa";
import { IoMdThermometer } from "react-icons/io";
import buildingImage from "../../assets/images/banner/three.jpg";

const AboutBuilding = () => {
	return (
		<section className="py-20 bg-gradient-to-b from-white to-gray-100">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
						LUXURY LIVING
					</span>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
						About <span className="text-blue-600">The Royal Palace</span>
					</h2>
					<div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
					<p className="max-w-2xl mx-auto text-lg text-gray-600">
						Discover the perfect blend of luxury, comfort, and convenience in the heart of the city
					</p>
				</div>

				<div className="flex flex-col lg:flex-row items-center gap-12">
					<div className="lg:w-1/2 mb-8 lg:mb-0 relative">
						<div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-500 z-10"></div>
						<img
							src={buildingImage}
							alt="The Royal Palace"
							className="w-full h-auto rounded-lg shadow-xl relative z-0 transition-transform duration-500 hover:scale-105"
						/>
						<div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-500 z-10"></div>

						<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-2 px-6 rounded-full shadow-lg">
							<div className="flex items-center gap-1">
								<FaStar className="text-yellow-500" />
								<FaStar className="text-yellow-500" />
								<FaStar className="text-yellow-500" />
								<FaStar className="text-yellow-500" />
								<FaStar className="text-yellow-500" />
								<span className="ml-2 font-semibold text-gray-800">Premium Building</span>
							</div>
						</div>
					</div>

					<div className="lg:w-1/2">
						<div className="mb-10">
							<div className="flex items-center mb-4">
								<FaBuilding className="text-blue-600 w-8 h-8 mr-4" />
								<h3 className="text-2xl font-bold text-gray-800">Modern Architecture</h3>
							</div>
							<p className="text-gray-700 leading-relaxed pl-12 border-l-2 border-blue-200">
								The Royal Palace is a state-of-the-art building designed to provide the ultimate living
								experience. Our building features a variety of luxurious apartments, each equipped with modern
								amenities and designed for comfort and style.
							</p>
						</div>

						<div className="mb-10">
							<div className="flex items-center mb-4">
								<FaShieldAlt className="text-blue-600 w-8 h-8 mr-4" />
								<h3 className="text-2xl font-bold text-gray-800">Your Safety, Our Priority</h3>
							</div>
							<p className="text-gray-700 leading-relaxed pl-12 border-l-2 border-blue-200">
								Our management system ensures that all residents enjoy a seamless living experience, with
								top-notch services tailored to meet their needs. From 24/7 security to on-site maintenance, we
								are committed to providing a safe and comfortable environment for all our residents.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-6 mt-8">
							<div className="flex items-center">
								<FaWifi className="text-blue-500 w-5 h-5 mr-3" />
								<span className="text-gray-700">High-Speed WiFi</span>
							</div>
							<div className="flex items-center">
								<FaSwimmingPool className="text-blue-500 w-5 h-5 mr-3" />
								<span className="text-gray-700">Luxury Pool</span>
							</div>
							<div className="flex items-center">
								<IoMdThermometer className="text-blue-500 w-5 h-5 mr-3" />
								<span className="text-gray-700">Climate Control</span>
							</div>
							<div className="flex items-center">
								<FaConciergeBell className="text-blue-500 w-5 h-5 mr-3" />
								<span className="text-gray-700">24/7 Concierge</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutBuilding;
