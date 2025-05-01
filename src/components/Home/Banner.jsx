import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaRegBuilding } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import one from '../../assets/images/banner/one.jpg';
import two from '../../assets/images/banner/two.jpg';
import three from '../../assets/images/banner/three.jpg';

// Banner content for each slide
const bannerContents = [
  {
    image: one,
    title: "Luxury Living at The Royal Palace",
    description: "Experience the epitome of luxury and comfort in our state-of-the-art building with breathtaking views and world-class amenities.",
    buttonText: "Explore Apartments"
  },
  {
    image: two,
    title: "Modern Design, Timeless Elegance",
    description: "Our meticulously designed spaces blend contemporary architecture with classic sophistication for an unparalleled living experience.",
    buttonText: "View Availability"
  },
  {
    image: three,
    title: "Your Dream Home Awaits",
    description: "Discover a community where luxury meets comfort, with spacious apartments and thoughtfully curated amenities for an elevated lifestyle.",
    buttonText: "Book a Tour"
  }
];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerContents.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? bannerContents.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning]);

  // Auto-slide effect
  useEffect(() => {
    let interval;
    if (isAutoplay && !isTransitioning) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, nextSlide, isTransitioning]);

  // Pause autoplay when user interacts with navigation
  const handleManualNavigation = (callback) => {
    setIsAutoplay(false);
    callback();
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const currentContent = bannerContents[currentImageIndex];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background images with Tailwind transitions */}
      <div
        className={`absolute inset-0 bg-cover bg-center transform transition-all duration-1000 ease-in-out ${isTransitioning ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ backgroundImage: `url(${currentContent.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full container mx-auto px-4">
        <div className="max-w-4xl">
          <div
            className={`text-center transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
          >
            <div
              className={`inline-flex items-center gap-2 bg-blue-600/90 text-white px-4 py-2 rounded-full mb-4 transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
            >
              <FaRegBuilding />
              <span className="uppercase tracking-wider text-sm font-semibold">Premium Residences</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {currentContent.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              {currentContent.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/apartments"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 hover:scale-105 font-medium text-lg shadow-lg hover:shadow-blue-500/30"
              >
                {currentContent.buttonText}
              </Link>

              <Link
                to="/login"
                className="bg-transparent text-white hover:text-blue-300 border border-white hover:border-blue-300 px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => handleManualNavigation(prevSlide)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl group-hover:scale-125 transition-transform" />
      </button>

      <button
        onClick={() => handleManualNavigation(nextSlide)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-20 group"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl group-hover:scale-125 transition-transform" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {bannerContents.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              handleManualNavigation(() => setCurrentImageIndex(index));
            }}
            className={`transition-all duration-300 ${index === currentImageIndex
                ? 'text-blue-500 scale-150'
                : 'text-white/50 hover:text-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <BsDot size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;