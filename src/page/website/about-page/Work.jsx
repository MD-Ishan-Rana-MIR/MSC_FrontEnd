import React from "react";

const Work = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row items-stretch">
                {/* left section */}
                <div className="lg:w-1/2 bg-[#2A7CC7] h-auto lg:h-[637px] flex items-center">
                    <div className="max-w-[438px] mx-auto px-6 py-12 lg:py-20">
                        <h1 className="text-xs lg:text-sm font-bold text-white">
                            WORK WITH US
                        </h1>
                        <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white lg:my-6 my-3 leading-tight">
                            Now Let’s Grow Yours
                        </h2>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                            The gradual accumulation of information about atomic and
                            small-scale behavior during the first quarter of the 20th
                            century provided scientists with a new foundation for the
                            study of matter.
                        </p>
                        <button className="px-6 py-3 mt-6 bg-white text-[#2A7CC7] font-medium rounded-lg shadow hover:bg-gray-200 transition">
                            Button
                        </button>
                    </div>
                </div>

                {/* right section */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src="/images/about/work/work.jpg"
                        alt="Work with us"
                        className="w-full h-[300px] sm:h-[400px] lg:h-[637px] object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Work;
