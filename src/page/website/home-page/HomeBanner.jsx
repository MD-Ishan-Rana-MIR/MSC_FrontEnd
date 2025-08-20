// CarouselBanner.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageProvider } from "@/lib/ImageProvider";

const slides = [
    {
        id: 1,
        title: "NEW COLLECTION",
        subtitle: "SUMMER 2020",
        description: "We know how large objects will act, but things on a small scale.",
        img: "https://i.ibb.co/9w5h9Bp/banner1.jpg",
    },
    {
        id: 2,
        title: "SPRING SALE",
        subtitle: "SPRING 2020",
        description: "Grab your favorite outfits at amazing discounts.",
        img: "https://i.ibb.co/2N2Qk2x/banner2.jpg",
    },
];

const HomeBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#01b7dc]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <div className="flex flex-col md:flex-row max-w-6xl mx-auto h-full">
                        {/* Left text area */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-10 text-white text-center md:text-left">
                            <p className="text-xs sm:text-sm mb-1 sm:mb-2">{slide.subtitle}</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                                {slide.title}
                            </h2>
                            <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
                                {slide.description}
                            </p>
                            <Button className="bg-white text-green-500 hover:bg-gray-100 hover:text-green-600 w-fit mx-auto md:mx-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm">
                                SHOP NOW
                            </Button>
                        </div>

                        {/* Right image area */}
                        <div
                            className="w-full md:w-1/2 h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${ImageProvider.banner})` }}
                        ></div>
                    </div>
                </div>
            ))}

            {/* Prev button */}
            <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 z-20"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Next button */}
            <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 z-20"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`w-8 sm:w-12 lg:w-16 h-1.5 sm:h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeBanner;
