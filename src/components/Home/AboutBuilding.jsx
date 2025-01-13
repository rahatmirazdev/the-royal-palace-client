import { FaBuilding, FaShieldAlt } from "react-icons/fa";
import buildingImage from "../../assets/images/banner/three.jpg";

const AboutBuilding = () => {
	return (
		<section className="bg-gray-100 py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
					About The Royal Palace
				</h2>
				<div className="flex flex-col md:flex-row items-center gap-8">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<img
							src={buildingImage}
							alt="The Royal Palace"
							className="w-full h-auto rounded-lg shadow-lg"
						/>
					</div>
					<div className="md:w-1/2 text-center md:text-left">
						<div className="mb-8">
							<FaBuilding className="mx-auto md:mx-0 text-blue-500 w-12 h-12 mb-4" />
							<p className="text-xl text-gray-700 mb-4">
								The Royal Palace is a state-of-the-art building
								designed to provide the ultimate living
								experience. Our building features a variety of
								luxurious apartments, each equipped with modern
								amenities and designed for comfort and style.
							</p>
						</div>
						<div className="mb-8">
							<FaShieldAlt className="mx-auto md:mx-0 text-blue-500 w-12 h-12 mb-4" />
							<p className="text-xl text-gray-700 mb-4">
								Our management system ensures that all residents
								enjoy a seamless living experience, with
								top-notch services tailored to meet their needs.
								From 24/7 security to on-site maintenance, we
								are committed to providing a safe and
								comfortable environment for all our residents.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutBuilding;
