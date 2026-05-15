import React from 'react';
import { motion } from 'motion/react';

export default function MarketHistoryCalculator() {
  return (
    <div className="pt-24 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4">
            Market History Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze historical market returns and test the impact of various limits and crediting strategies.
          </p>
        </motion.div>

        {/* Calculator Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="w-full min-h-[850px] h-[calc(100vh-200px)]">
            <iframe
              src="/my-calculator/index.html"
              title="Market History Calculator"
              className="w-full h-full border-0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </motion.div>

        <div className="mt-8 text-center text-gray-400 text-sm italic">
          * This calculator utilizes historical data for educational and illustrative purposes.
        </div>
      </div>
    </div>
  );
}
