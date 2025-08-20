import React from 'react'

const Customar = () => {
    return (
        <div className="max-w-6xl mx-auto lg:px-0 px-4">
            <div className="py-10 lg:py-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center">
                {/* Happy Customers */}
                <div>
                    <h1 className="text-[#252B42] lg:text-[58px] text-3xl font-bold">
                        15K
                    </h1>
                    <p className="text-[#737373] lg:text-[16px] text-xs font-bold">
                        Happy Customers
                    </p>
                </div>
                {/* Monthly Visitors */}
                <div>
                    <h1 className="text-[#252B42] lg:text-[58px] text-3xl font-bold">
                        150K
                    </h1>
                    <p className="text-[#737373] lg:text-[16px] text-xs font-bold">
                        Monthly Visitors
                    </p>
                </div>
                {/* Countries Worldwide */}
                <div>
                    <h1 className="text-[#252B42] lg:text-[58px] text-3xl font-bold">
                        15
                    </h1>
                    <p className="text-[#737373] lg:text-[16px] text-xs font-bold">
                        Countries Worldwide
                    </p>
                </div>
                {/* Top Partners */}
                <div>
                    <h1 className="text-[#252B42] lg:text-[58px] text-3xl font-bold">
                        100+
                    </h1>
                    <p className="text-[#737373] lg:text-[16px] text-xs font-bold">
                        Top Partners
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Customar
