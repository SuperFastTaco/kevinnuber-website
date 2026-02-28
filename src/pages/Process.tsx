import { BarChart3, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BuildGraphic, ScaleGraphic, CapitalizeGraphic } from '../components/PhaseGraphics';

export default function Process() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/process/1920/1080"
            alt="Business Process"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl">
            The Advisor Lifecycle
          </h1>
          
          <div className="mt-12 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/zzI2mFXVs8I"
              title="The Advisor Lifecycle"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="mt-10 text-lg sm:text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
            With increasing regulations, rising selling standards, and client access to information, owning a financial services business has become increasingly more complex. Our goal is to help you simplify, make more money, and maximize business value.
          </p>
        </div>
      </section>

      {/* Animated Chart Section */}
      <section className="py-24 bg-brand-light border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm">The Journey</h2>
            <p className="mt-2 text-3xl font-serif font-bold text-brand-blue sm:text-4xl">
              Enterprise Value & Profit Progression
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[500px] w-full pl-12 sm:pl-16 pb-12">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-12 w-12 sm:w-16 flex flex-col justify-between text-xs sm:text-sm font-medium text-gray-500 text-right pr-4">
              <span>10x</span>
              <span>8x</span>
              <span>6x</span>
              <span>4x</span>
              <span>2x</span>
              <span>1x</span>
            </div>
            
            {/* Y-axis Title */}
            <div className="absolute left-[-60px] sm:left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 tracking-widest uppercase">
              Enterprise Value
            </div>

            {/* Chart Area */}
            <div className="relative w-full h-full border-l-2 border-b-2 border-gray-300">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-gray-200/50"></div>
                ))}
              </div>

              {/* Animated Line */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path
                  d="M 0 100 C 15 100, 20 70, 33 70 C 45 70, 50 30, 66 30 C 80 30, 85 0, 100 0"
                  fill="none"
                  stroke="url(#chart-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="chart-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f2b46" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#c2a677" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Nodes */}
              <motion.div
                className="absolute left-[33%] top-[70%] -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="w-5 h-5 rounded-full bg-brand-blue border-4 border-white shadow-md"></div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-100 text-center min-w-[140px]">
                  <p className="font-serif font-bold text-brand-blue text-lg">Build</p>
                  <p className="text-xs text-gray-500 font-medium">Consistent Client Acquisition</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-[66%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <div className="w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-md"></div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-100 text-center min-w-[140px]">
                  <p className="font-serif font-bold text-blue-600 text-lg">Scale</p>
                  <p className="text-xs text-gray-500 font-medium">More Revenue, Less Time</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-[100%] top-[0%] -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.4, duration: 0.5 }}
              >
                <div className="w-6 h-6 rounded-full bg-brand-accent border-4 border-white shadow-md"></div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl border border-brand-accent/20 text-center min-w-[140px]">
                  <p className="font-serif font-bold text-brand-accent text-lg">Capitalize</p>
                  <p className="text-xs text-gray-500 font-medium">Maximize Business Value</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-y-24 lg:grid-cols-1">
          
          {/* Build */}
          <motion.div 
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 text-brand-blue mb-6">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-blue sm:text-4xl">
                Phase 1: Build
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                In the Build phase, the primary objective is consistent client acquisition. The main challenge standing in the way is knowing exactly which sales and marketing strategies to deploy.
              </p>
              <ul className="mt-8 space-y-4 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Objective:</strong> Consistent Client Acquisition</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Challenge:</strong> Sales and Marketing</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Focus:</strong> Establishing a solid foundation and predictable pipeline.</span>
                </li>
              </ul>
            </div>
            <div className="mt-16 lg:mt-0">
              <BuildGraphic />
            </div>
          </motion.div>

          {/* Scale */}
          <motion.div 
            className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="order-2 lg:order-1 mt-16 lg:mt-0">
              <ScaleGraphic />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 text-brand-blue mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-blue sm:text-4xl">
                Phase 2: Scale
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                In the Scale phase, the primary objective is to generate more revenue in less time. The challenge here shifts to people operations and processes—knowing when to hire staff and invest in technologies to increase business efficiencies.
              </p>
              <ul className="mt-8 space-y-4 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Objective:</strong> Generate More Revenue in Less Time</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Challenge:</strong> Personnel, Technology and Processes</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Focus:</strong> Building capacity without sacrificing service quality.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Capitalize */}
          <motion.div 
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 text-brand-blue mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-blue sm:text-4xl">
                Phase 3: Capitalize
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lastly, in the Capitalize phase, the primary objective is to maximize business value and build long-term equity. The challenge you face is having the proper business structure and support to make that happen.
              </p>
              <ul className="mt-8 space-y-4 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Objective:</strong> Maximize Business Value</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Challenge:</strong> Business Structure and Support</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle2 className="h-6 w-5 flex-none text-brand-accent" />
                  <span><strong className="text-brand-blue">Focus:</strong> Reaping the rewards of your life's work and securing your legacy.</span>
                </li>
              </ul>
            </div>
            <div className="mt-16 lg:mt-0">
              <CapitalizeGraphic />
            </div>
          </motion.div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl">
            Ready to find out where you stand?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Let's identify your current phase and build a roadmap for your next level of success.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://calendly.com/kevin-nuber"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-brand-blue shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
