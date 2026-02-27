import { motion } from 'motion/react';

const gridBackground = (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
);

export function BuildGraphic() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full aspect-[4/3] rounded-2xl bg-[#0a192f] flex items-center justify-center p-8 shadow-2xl ring-1 ring-white/10 overflow-hidden relative"
    >
      {gridBackground}
      <svg viewBox="0 0 200 150" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <linearGradient id="build-grad-1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0f2b46" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="build-grad-2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9a815c" />
            <stop offset="100%" stopColor="#c2a677" />
          </linearGradient>
        </defs>
        {/* Foundation */}
        <motion.rect x="30" y="110" width="140" height="15" rx="4" fill="#1e293b" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} />
        
        {/* Pillars */}
        <motion.rect x="45" y="60" width="25" height="45" rx="2" fill="url(#build-grad-1)" variants={{ hidden: { opacity: 0, scaleY: 0 }, visible: { opacity: 1, scaleY: 1, transition: { duration: 0.5, delay: 0.2 } } }} style={{ transformOrigin: "bottom" }} />
        <motion.rect x="87.5" y="40" width="25" height="65" rx="2" fill="url(#build-grad-1)" variants={{ hidden: { opacity: 0, scaleY: 0 }, visible: { opacity: 1, scaleY: 1, transition: { duration: 0.5, delay: 0.4 } } }} style={{ transformOrigin: "bottom" }} />
        <motion.rect x="130" y="20" width="25" height="85" rx="2" fill="url(#build-grad-2)" variants={{ hidden: { opacity: 0, scaleY: 0 }, visible: { opacity: 1, scaleY: 1, transition: { duration: 0.5, delay: 0.6 } } }} style={{ transformOrigin: "bottom" }} />
        
        {/* Connecting Line */}
        <motion.path d="M 57.5 60 L 100 40 L 142.5 20" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.8, delay: 1 } } }} />
      </svg>
    </motion.div>
  );
}

export function ScaleGraphic() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full aspect-[4/3] rounded-2xl bg-[#0a192f] flex items-center justify-center p-8 shadow-2xl ring-1 ring-white/10 overflow-hidden relative"
    >
      {gridBackground}
      <svg viewBox="0 0 200 150" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <linearGradient id="scale-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#c2a677" />
          </linearGradient>
        </defs>
        {/* Main upward curve */}
        <motion.path d="M 20 130 C 60 130, 80 70, 170 20" fill="none" stroke="url(#scale-grad)" strokeWidth="6" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2, ease: "easeInOut" } } }} />
        
        {/* Secondary curves */}
        <motion.path d="M 20 130 C 70 110, 100 90, 150 60" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.5" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2, delay: 0.2, ease: "easeInOut" } } }} />
        <motion.path d="M 20 130 C 50 140, 120 110, 160 90" fill="none" stroke="#c2a677" strokeWidth="3" strokeLinecap="round" opacity="0.5" variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.2, delay: 0.4, ease: "easeInOut" } } }} />
        
        {/* Nodes */}
        <motion.circle cx="80" cy="88" r="5" fill="#0a192f" stroke="#3b82f6" strokeWidth="2" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.3, delay: 0.6 } } }} />
        <motion.circle cx="125" cy="48" r="6" fill="#0a192f" stroke="#c2a677" strokeWidth="2" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.3, delay: 0.8 } } }} />
        <motion.circle cx="170" cy="20" r="8" fill="#c2a677" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.4, delay: 1 } } }} />
        <motion.circle cx="170" cy="20" r="14" fill="none" stroke="#c2a677" strokeWidth="1" opacity="0.5" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.6, delay: 1 } } }} />
      </svg>
    </motion.div>
  );
}

export function CapitalizeGraphic() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full aspect-[4/3] rounded-2xl bg-[#0a192f] flex items-center justify-center p-8 shadow-2xl ring-1 ring-white/10 overflow-hidden relative"
    >
      {gridBackground}
      <svg viewBox="0 0 200 150" className="w-full h-full relative z-10 overflow-visible">
        <defs>
          <linearGradient id="cap-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c2a677" />
            <stop offset="100%" stopColor="#8a734d" />
          </linearGradient>
          <linearGradient id="cap-grad-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e6cc98" />
            <stop offset="100%" stopColor="#c2a677" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Center glowing element */}
        <motion.circle cx="100" cy="75" r="40" fill="#c2a677" opacity="0.1" filter="url(#glow)" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 1 } } }} />
        
        {/* Diamond shape */}
        <motion.path 
          d="M 100 25 L 145 75 L 100 125 L 55 75 Z" 
          fill="url(#cap-grad-main)" 
          variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -45 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } } }} 
        />
        
        {/* Diamond facets */}
        <motion.path 
          d="M 100 25 L 145 75 L 100 75 Z" 
          fill="url(#cap-grad-light)" 
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } } }} 
        />
        <motion.path 
          d="M 55 75 L 100 25 L 100 75 Z" 
          fill="#ffffff" 
          opacity="0.2"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.2, transition: { duration: 0.5, delay: 0.6 } } }} 
        />
        
        {/* Outer ring */}
        <motion.circle cx="100" cy="75" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" variants={{ hidden: { scale: 0, rotate: -90 }, visible: { scale: 1, rotate: 0, transition: { duration: 1.5, ease: "easeOut" } } }} />
        <motion.circle cx="100" cy="75" r="70" fill="none" stroke="#c2a677" strokeWidth="1" opacity="0.2" variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 1.2, delay: 0.2, ease: "easeOut" } } }} />
      </svg>
    </motion.div>
  );
}
