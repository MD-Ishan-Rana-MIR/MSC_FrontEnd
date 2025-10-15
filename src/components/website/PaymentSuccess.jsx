import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import React from "react";

export default function PaymentSuccess() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center px-6">
            {/* Animated Check Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-6"
            >
                <CheckCircle className="text-green-500 w-24 h-24" />
            </motion.div>

            {/* Success Text */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800 mb-2 text-center"
            >
                Payment Successful!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center mb-6 max-w-md"
            >
                Thank you for your payment. Your transaction has been completed successfully.
            </motion.p>

            {/* Transaction Card */}
            {/* <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center border border-green-100"
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Transaction Details</h2>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>
                        <span className="font-medium text-gray-700">Transaction ID:</span> #TXN12458632
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Amount:</span> $149.00
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Payment Method:</span> Credit Card
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Date:</span> October 15, 2025
                    </p>
                </div>
            </motion.div> */}

            {/* Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 cursor-pointer bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-md transition duration-300"
                onClick={() => (window.location.href = "/")}
            >
                Go to Home Page
            </motion.button>
        </div>
    );
}
