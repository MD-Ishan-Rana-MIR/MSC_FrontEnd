import React from "react";

const Company = () => {
    return (
        <div className="bg-[#FAFAFA] lg:pt-20 pt-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div>
                    <h1 className="text-center font-bold lg:text-[40px] text-2xl text-[#252B42]">
                        Big Companies Are Here
                    </h1>
                    <p className="text-center mt-6 text-[#737373] font-normal lg:text-sm text-xs">
                        Problems trying to resolve the conflict between <br className="hidden sm:block" />
                        the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>

                {/* Logo Section */}
                <div className="mt-10 py-6 lg:py-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
                        <img src="/images/about/logo/logo-1.png" alt="Logo 1" className="w-24 md:w-28 lg:w-32 object-contain" />
                        <img src="/images/about/logo/logo-2.png" alt="Logo 2" className="w-24 md:w-28 lg:w-32 object-contain" />
                        <img src="/images/about/logo/logo-3.png" alt="Logo 3" className="w-24 md:w-28 lg:w-32 object-contain" />
                        <img src="/images/about/logo/logo-4.png" alt="Logo 4" className="w-24 md:w-28 lg:w-32 object-contain" />
                        <img src="/images/about/logo/logo-5.png" alt="Logo 5" className="w-24 md:w-28 lg:w-32 object-contain" />
                        <img src="/images/about/logo/logo-6.png" alt="Logo 6" className="w-24 md:w-28 lg:w-32 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Company;
