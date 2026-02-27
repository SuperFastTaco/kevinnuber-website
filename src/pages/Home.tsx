import { ArrowRight, BarChart3, TrendingUp, ShieldCheck, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-brand-blue">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/office/1920/1080"
            alt="Wealth Management Office"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
                Build, Scale, and Capitalize Your Practice.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                I am Kevin Nuber, an Advisor Development Consultant. I help seasoned financial professionals overcome unique challenges at every phase of their lifecycle.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="https://calendly.com/kevin-nuber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-md text-brand-blue bg-brand-accent hover:bg-opacity-90 shadow-sm transition-all"
                >
                  Book an Appointment
                </a>
                <Link
                  to="/process"
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 shadow-sm transition-all"
                >
                  Explore the Process
                </Link>
                <a
                  href="https://www.linkedin.com/in/kevin-nuber-ricp-a8587313a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-white/20 text-base font-medium rounded-md text-white hover:bg-white/10 shadow-sm transition-all"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Connect
                </a>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md w-full aspect-[4/5] border-4 border-white/10">
                {/* Professional headshot */}
                <img
                  src="/pictures/kevin-headshot.jpg"
                  alt="Kevin Nuber - Professional Headshot"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm">The Lifecycle</h2>
            <p className="mt-2 text-3xl font-serif font-bold text-brand-blue sm:text-4xl">
              A Proven Process for Advisors
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Owning a financial services business has become increasingly complex. We help you simplify, make more money, and maximize business value in the shortest amount of time with minimal frustration.
            </p>
          </div>

          <div className="mt-20 relative max-w-4xl mx-auto h-[400px] sm:h-[500px] w-full pl-12 sm:pl-16 pb-12">
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
                  viewport={{ once: true, margin: "-100px" }}
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
          
          <div className="mt-16 text-center">
            <Link to="/process" className="inline-flex items-center text-brand-blue font-medium hover:text-brand-accent transition-colors">
              Learn more about the process <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section 
        className="relative py-24 bg-fixed bg-center bg-cover" 
        style={{ backgroundImage: "url('https://picsum.photos/seed/architecture/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/95"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm">Insights</h2>
            <p className="mt-2 text-3xl font-serif font-bold text-white sm:text-4xl">
              Latest from the Channel
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Actionable advice, proven frameworks, and industry insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/c-l97h2j1Rg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/sNnpsV9ccPQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/zzI2mFXVs8I"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center text-white font-medium hover:text-brand-accent transition-colors">
              View all insights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Purpose Teaser */}
      <section 
        className="relative py-24 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://picsum.photos/seed/lifestyle/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-slate-900/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white sm:text-4xl">
                Work hard. Play hard.
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                I believe in building a business that supports the life you want to live. When I'm not helping advisors scale their practices, you'll find me fishing, traveling, and creating videos.
              </p>
              <div className="mt-8">
                <Link
                  to="/personal"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-brand-blue transition-all"
                >
                  See the Personal Side
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 grid grid-cols-2 gap-4">
              <img
                src="/pictures/workplay1.jpg"
                alt="Work hard play hard 1"
                className="rounded-lg object-cover w-full h-48 shadow-2xl border border-white/10"
              />
              <img
                src="/pictures/workplay2.jpg"
                alt="Work hard play hard 2"
                className="rounded-lg object-cover w-full h-48 shadow-2xl mt-8 border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
