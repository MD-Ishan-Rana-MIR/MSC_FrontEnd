import React from "react";
import { Phone, MapPin, Mail } from "lucide-react"; // icons

const ContactSection = () => {
    return (
        <section className="w-full px-6 md:px-16 lg:px-24 py-16 text-center">
            {/* Heading */}
            <p className="text-sm uppercase text-gray-500 tracking-wide mb-2">
                Visit Our Office
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
                We help small businesses <br /> with big ideas
            </h2>

            {/* 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Phone */}
                <div className="p-8 border rounded-lg flex flex-col items-center">
                    <Phone className="text-blue-500 w-10 h-10 mb-4" />
                    <p className="text-gray-700 mb-1">georgia.young@example.com</p>
                    <p className="text-gray-700 mb-6">georgia.young@youprobe.com</p>
                    <button className="text-blue-500 underline mb-2">Get Support</button>
                    <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                        Submit Request
                    </button>
                </div>

                {/* Location - highlighted */}
                <div className="p-8 bg-[#0D1B2A] text-white rounded-lg flex flex-col items-center">
                    <MapPin className="text-blue-400 w-10 h-10 mb-4" />
                    <p className="mb-1">georgia.young@example.com</p>
                    <p className="mb-6">georgia.young@youprobe.com</p>
                    <button className="underline mb-2">Get Support</button>
                    <button className="px-6 py-2 border border-blue-400 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition">
                        Submit Request
                    </button>
                </div>

                {/* Email */}
                <div className="p-8 border rounded-lg flex flex-col items-center">
                    <Mail className="text-blue-500 w-10 h-10 mb-4" />
                    <p className="text-gray-700 mb-1">georgia.young@example.com</p>
                    <p className="text-gray-700 mb-6">georgia.young@youprobe.com</p>
                    <button className="text-blue-500 underline mb-2">Get Support</button>
                    <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
                        Submit Request
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
