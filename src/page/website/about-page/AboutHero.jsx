import React from 'react'

const AboutHero = () => {
    return (
        <div className="lg:my-6 my-3">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-16 gap-y-6 lg:gap-y-0 gap-x-8 px-4">

                {/* Left Section */}
                <div className="max-w-[394px] text-center lg:text-left">
                    <p className="text-[#E74040] lg:text-sm text-xs font-normal">
                        Problems trying
                    </p>
                    <h1 className="lg:mt-6 mt-3 font-bold lg:text-2xl text-xl">
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                    </h1>
                </div>

                {/* Right Section */}
                <div className="max-w-[545px] text-center lg:text-left">
                    <p className="text-[#737373] font-normal lg:text-sm text-xs">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutHero
