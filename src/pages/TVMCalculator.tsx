import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, RotateCcw, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TVMCalculator() {
  const [n, setN] = useState('');
  const [iy, setIy] = useState('');
  const [pv, setPv] = useState('');
  const [pmt, setPmt] = useState('');
  const [fv, setFv] = useState('');
  const [type, setType] = useState('0'); // 0 for End, 1 for Begin
  const [py, setPy] = useState('12'); // Design screenshot shows 12
  const [cy, setCy] = useState('12');

  const parseVal = (val: string) => {
    const cleaned = val.replace(/[^0-9.-]/g, '');
    return cleaned === '' ? 0 : parseFloat(cleaned);
  };

  const getRatePerPeriod = () => {
    const annualRate = parseVal(iy) / 100;
    const periodsPerYear = parseVal(py);
    const compoundingPerYear = parseVal(cy);
    
    const ear = Math.pow(1 + annualRate / compoundingPerYear, compoundingPerYear) - 1;
    return Math.pow(1 + ear, 1 / periodsPerYear) - 1;
  };

  const adjustSigns = (pvVal: number, pmtVal: number, fvVal: number) => {
    let adjPv = pvVal, adjPmt = pmtVal, adjFv = fvVal;
    const signs = [Math.sign(pvVal), Math.sign(pmtVal), Math.sign(fvVal)].filter(s => s !== 0);
    if (signs.length > 1 && signs.every(s => s === signs[0])) {
       if (pvVal !== 0) {
         adjPmt = -pmtVal;
         adjFv = -fvVal;
       } else {
         adjFv = -fvVal;
       }
    }
    return { adjPv, adjPmt, adjFv };
  };

  const solveForN = () => {
    const r = getRatePerPeriod();
    const pval = parseVal(pv);
    const pmtVal = parseVal(pmt);
    const fval = parseVal(fv);
    const t = parseInt(type);

    const { adjPv, adjPmt, adjFv } = adjustSigns(pval, pmtVal, fval);

    if (r === 0) {
      if (adjPmt === 0) return;
      const res = -(adjPv + adjFv) / adjPmt;
      setN(Math.abs(res).toFixed(4));
      return;
    }

    try {
      const num = adjPmt * (1 + r * t) - adjFv * r;
      const den = adjPv * r + adjPmt * (1 + r * t);
      const res = Math.log(num / den) / Math.log(1 + r);
      setN(Math.abs(res).toFixed(4));
    } catch {
      alert("No solution found. Check your inputs.");
    }
  };

  const solveForRate = () => {
    const nVal = parseVal(n);
    const pval = parseVal(pv);
    const pmtVal = parseVal(pmt);
    const fval = parseVal(fv);
    const t = parseInt(type);
    const pyVal = parseVal(py);
    const cyVal = parseVal(cy);

    const { adjPv, adjPmt, adjFv } = adjustSigns(pval, pmtVal, fval);

    let low = -0.999999 / pyVal;
    let high = 100.0;
    
    const f = (r: number) => {
      if (r === 0) return adjPv + adjPmt * nVal + adjFv;
      const pow = Math.pow(1 + r, nVal);
      return adjPv * pow + adjPmt * (1 + r * t) * (pow - 1) / r + adjFv;
    };

    let lowSign = f(low) > 0;
    let highSign = f(high) > 0;

    if (lowSign === highSign) {
      alert("Could not find a valid solution for the current inputs.");
      return;
    }

    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      const midSign = f(mid) > 0;
      if (midSign === lowSign) {
        low = mid;
      } else {
        high = mid;
      }
    }

    const annualNominal = cyVal * (Math.pow(1 + (low + high) / 2, pyVal / cyVal) - 1);
    setIy((annualNominal * 100).toFixed(4));
  };


  const solveForPV = () => {
    const r = getRatePerPeriod();
    const nVal = parseVal(n);
    const pmtVal = parseVal(pmt);
    const fval = parseVal(fv);
    const t = parseInt(type);

    if (r === 0) {
      setPv(Math.abs(-(fval + pmtVal * nVal)).toFixed(2));
      return;
    }

    const pow = Math.pow(1 + r, nVal);
    const res = -(fval + pmtVal * (1 + r * t) * (pow - 1) / r) / pow;
    setPv(Math.abs(res).toFixed(2));
  };

  const solveForPMT = () => {
    const r = getRatePerPeriod();
    const nVal = parseVal(n);
    const pval = parseVal(pv);
    const fval = parseVal(fv);
    const t = parseInt(type);

    if (r === 0) {
      setPmt(Math.abs((-(pval + fval) / nVal)).toFixed(2));
      return;
    }

    const pow = Math.pow(1 + r, nVal);
    const res = -(pval * pow + fval) / ((1 + r * t) * (pow - 1) / r);
    setPmt(Math.abs(res).toFixed(2));
  };

  const solveForFV = () => {
    const r = getRatePerPeriod();
    const nVal = parseVal(n);
    const pval = parseVal(pv);
    const pmtVal = parseVal(pmt);
    const t = parseInt(type);

    if (r === 0) {
      setFv(Math.abs(-(pval + pmtVal * nVal)).toFixed(2));
      return;
    }

    const pow = Math.pow(1 + r, nVal);
    const res = -(pval * pow + pmtVal * (1 + r * t) * (pow - 1) / r);
    setFv(Math.abs(res).toFixed(2));
  };

  const reset = () => {
    setN('');
    setIy('');
    setPv('');
    setPmt('');
    setFv('');
    setType('0');
    setPy('12');
    setCy('12');
  };

  return (
    <div className="bg-[#f7f9fb] min-h-screen text-slate-900 font-sans pb-16">
      {/* Utility App Header matching mockup */}
      <div className="bg-[#f7f9fb] border-b border-gray-200">
        <div className="max-w-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link to="/" className="text-brand-blue hover:text-brand-accent transition-colors">
            <Landmark size={24} />
          </Link>
          <h1 className="text-[28px] font-serif font-bold text-brand-blue tracking-tight">TVM Calculator</h1>
          <button className="text-brand-blue hover:text-brand-accent transition-colors">
            <History size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        <p className="text-center text-slate-700 font-medium text-sm sm:text-base px-4 mb-8">
          Enter known values and tap SOLVE next to the variable you wish to calculate.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Investment Terms Card */}
          <div className="bg-white rounded-lg border border-[#e0e3e5] shadow-[0_2px_15px_rgba(15,43,70,0.04)] px-5 py-6">
            <h2 className="text-brand-blue font-serif text-[28px] font-bold mb-4 border-b border-gray-100 pb-4">
              Investment Terms
            </h2>
            <div className="space-y-5">
              {/* N */}
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Number of Periods (N)</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded px-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-base"
                      placeholder="0"
                      value={n}
                      onChange={(e) => setN(e.target.value)}
                    />
                  </div>
                  <button onClick={solveForN} className="bg-brand-accent hover:bg-[#b0966a] transition-colors text-white font-bold px-6 rounded text-sm tracking-wide">
                    SOLVE
                  </button>
                </div>
              </div>

              {/* I/Y */}
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Interest Rate (I/Y)</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded pl-4 pr-8 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-base"
                      placeholder="0.00"
                      value={iy}
                      onChange={(e) => setIy(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      %
                    </div>
                  </div>
                  <button onClick={solveForRate} className="bg-brand-accent hover:bg-[#b0966a] transition-colors text-white font-bold px-6 rounded text-sm tracking-wide">
                    SOLVE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flows Card */}
          <div className="bg-white rounded-lg border border-[#e0e3e5] shadow-[0_2px_15px_rgba(15,43,70,0.04)] px-5 py-6">
            <h2 className="text-brand-blue font-serif text-[28px] font-bold mb-4 border-b border-gray-100 pb-4">
              Cash Flows
            </h2>
            <div className="space-y-5">
              {/* PV */}
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Present Value (PV)</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 flex items-center pointer-events-none">
                      $
                    </div>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded pl-8 pr-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-base"
                      placeholder="0.00"
                      value={pv}
                      onChange={(e) => setPv(e.target.value)}
                    />
                  </div>
                  <button onClick={solveForPV} className="bg-brand-accent hover:bg-[#b0966a] transition-colors text-white font-bold px-6 rounded text-sm tracking-wide">
                    SOLVE
                  </button>
                </div>
              </div>

              {/* PMT */}
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Payment Amount (PMT)</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      $
                    </div>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded pl-8 pr-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-base"
                      placeholder="0.00"
                      value={pmt}
                      onChange={(e) => setPmt(e.target.value)}
                    />
                  </div>
                  <button onClick={solveForPMT} className="bg-brand-accent hover:bg-[#b0966a] transition-colors text-white font-bold px-6 rounded text-sm tracking-wide">
                    SOLVE
                  </button>
                </div>
              </div>

              {/* FV */}
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Future Value (FV)</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      $
                    </div>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded pl-8 pr-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-base"
                      placeholder="0.00"
                      value={fv}
                      onChange={(e) => setFv(e.target.value)}
                    />
                  </div>
                  <button onClick={solveForFV} className="bg-brand-accent hover:bg-[#b0966a] transition-colors text-white font-bold px-6 rounded text-sm tracking-wide">
                    SOLVE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-lg border border-[#e0e3e5] shadow-[0_2px_15px_rgba(15,43,70,0.04)] px-5 py-6">
            <h2 className="text-brand-blue font-serif text-[28px] font-bold mb-4 border-b border-gray-100 pb-4">
              Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[#43474d] text-xs font-bold mb-2">Payment Timing</label>
                <div className="flex border border-[#e0e3e5] rounded overflow-hidden p-0.5 bg-[#f2f4f6]">
                  <button
                    onClick={() => setType('0')}
                    className={`flex-1 py-1.5 text-sm font-semibold transition-colors ${type === '0' ? 'bg-white text-slate-900 shadow-sm rounded-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    END
                  </button>
                  <button
                    onClick={() => setType('1')}
                    className={`flex-1 py-1.5 text-sm font-semibold transition-colors ${type === '1' ? 'bg-white text-slate-900 shadow-sm rounded-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    BGN
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[#43474d] text-xs font-bold mb-2">Periods/Year (P/Y)</label>
                  <input
                    type="number"
                    value={py}
                    onChange={(e) => setPy(e.target.value)}
                    className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded px-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-center text-base"
                  />
                </div>
                <div>
                  <label className="block text-[#43474d] text-xs font-bold mb-2">Compounding (C/Y)</label>
                  <input
                    type="number"
                    value={cy}
                    onChange={(e) => setCy(e.target.value)}
                    className="w-full bg-white border border-[#c3c6ce] focus:border-brand-blue focus:ring-1 focus:ring-brand-blue rounded px-4 py-2.5 text-slate-900 outline-none transition-all placeholder-slate-300 font-mono text-center text-base"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-[#47607e] hover:text-brand-blue bg-white border border-[#74777e] hover:bg-slate-50 rounded-lg px-6 py-2.5 text-[15px] font-semibold transition-all shadow-sm"
            >
              <RotateCcw size={18} />
              Clear All Values
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

