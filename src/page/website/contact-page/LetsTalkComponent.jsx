import React from 'react';

const LetsTalkComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-8">
            {/* Curved Arrow SVG */}
            <div className="mb-8">
                <svg
                    width="120"
                    height="80"
                    viewBox="0 0 120 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-400"
                >
                    <path
                        d="M20 20 Q60 5 100 25"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                    />
                    <path
                        d="M90 20 L100 25 L95 35"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Subheading */}
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-4">
                WE Can't WAIT TO MEET YOU
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
                Let's Talk
            </h1>

            {/* CTA Button */}
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Try it free now
            </button>
        </div>
    );
};

export default LetsTalkComponent;