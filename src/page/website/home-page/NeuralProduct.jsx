
import { Button } from "@/components/ui/button";
import React from "react";

const NeuralProduct = ()=> {
  return (
    <div className=" max-w-6xl mx-auto px-4 lg:px-0 ">
        <section className="flex flex-col md:flex-row items-center justify-between  bg-white">
      {/* Left Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/images/home/product/product-6.png" // replace with your uploaded image path
          alt="Couple"
          className="rounded-md w-[704px] h-[500px] "
        />
      </div>

      {/* Right Content Section */}
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
        <p className=" font-bold text-[#BDBDBD] lg:text-[16px] text-xs tracking-widest uppercase">
          Summer 2020
        </p>
        <h2 className=" lg:my-8 my-4 text-[#252B42] lg:text-[40px] text-xl font-bold ">
          Part of the Neural Universe
        </h2>
        <p className=" text-[#737373] lg:text-xl text-sm font-normal  max-w-md">
          We know how large objects will act, but things on a small scale.
        </p>

        <div className="flex gap-4 mt-6">
          <Button className="bg-[#2DC071] hover:bg-green-600 cursor-pointer text-white px-5 py-2 lg:px-10 lg:py-4 ">
            Buy Now
          </Button>
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-50 cursor-pointer px-6 py-2"
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
    </div>
  );
}


export default NeuralProduct;