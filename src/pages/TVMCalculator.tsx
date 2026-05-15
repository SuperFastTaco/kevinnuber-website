import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info, RotateCcw } from 'lucide-react';

import Layout from '../components/Layout';

export default function TVMCalculator() {
  const [n, setN] = useState('');
  const [iy, setIy] = useState('');
  const [pv, setPv] = useState('');
  const [pmt, setPmt] = useState('');
  const [fv, setFv] = useState('');
  const [type, setType] = useState('0'); // 0 for End, 1 for Begin
  const [py, setPy] = useState('1'); // Default to 1 (Annual)
  const [cy, setCy] = useState('1'); // Default to 1 (Annual)

  const parseVal = (val: string) => {
    const cleaned = val.replace(/[^0-9.-]/g, '');
    return cleaned === '' ? 0 : parseFloat(cleaned);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(val));
  };

  const getRatePerPeriod = () => {
    const annualRate = parseVal(iy) / 100;
    const periodsPerYear = parseVal(py);
    const compoundingPerYear = parseVal(cy);
    
    // Effective Annual Rate (EAR) = (1 + i_nom / m)^m - 1
    // Rate per period = (1 + EAR)^(1/p) - 1
    const ear = Math.pow(1 + annualRate / compoundingPerYear, compoundingPerYear) - 1;
    return Math.pow(1 + ear, 1 / periodsPerYear) - 1;
  };

  const solveForN = () => {
    const r = getRatePerPeriod();
    const pval = parseVal(pv);
    const pmtVal = parseVal(pmt);
    const fval = parseVal(fv);
    const t = parseInt(type);

    if (r === 0) {
      if (pmtVal === 0) return;
      const res = -(pval + fval) / pmtVal;
      setN(Math.abs(res).toFixed(4));
      return;
    }

    try {
      const num = pmtVal * (1 + r * t) - fval * r;
      const den = pval * r + pmtVal * (1 + r * t);
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

    let low = -0.999999 / pyVal;
    let high = 100.0;
    
    const f = (r: number) => {
      if (r === 0) return pval + pmtVal * nVal + fval;
      const pow = Math.pow(1 + r, nVal);
      return pval * pow + pmtVal * (1 + r * t) * (pow - 1) / r + fval;
    };

    // Robust binary search
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
    setPy('1');
    setCy('1');
  };

  return (
    <Layout>
      <div className="py-32 bg-brand-light min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
        <div className="bg-brand-blue p-8 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Calculator size={120} />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-2">TVM Calculator</h1>
          <p className="text-brand-accent font-medium uppercase tracking-widest text-sm">Time Value of Money</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Input Groups */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  Number of Periods (N)
                  <button onClick={solveForN} className="text-xs text-brand-blue hover:text-brand-accent font-bold uppercase transition-colors">Solve</button>
                </label>
                <input 
                  type="text" 
                  value={n} 
                  onChange={(e) => setN(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all font-mono"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  Annual Interest Rate (I/Y %)
                  <button onClick={solveForRate} className="text-xs text-brand-blue hover:text-brand-accent font-bold uppercase transition-colors">Solve</button>
                </label>
                <input 
                  type="text" 
                  value={iy} 
                  onChange={(e) => setIy(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all font-mono"
                  placeholder="0.00 %"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  Present Value (PV)
                  <button onClick={solveForPV} className="text-xs text-brand-blue hover:text-brand-accent font-bold uppercase transition-colors">Solve</button>
                </label>
                <input 
                  type="text" 
                  value={pv} 
                  onChange={(e) => setPv(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all font-mono"
                  placeholder="$ 0.00"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  Periodic Payment (PMT)
                  <button onClick={solveForPMT} className="text-xs text-brand-blue hover:text-brand-accent font-bold uppercase transition-colors">Solve</button>
                </label>
                <input 
                  type="text" 
                  value={pmt} 
                  onChange={(e) => setPmt(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all font-mono"
                  placeholder="$ 0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  Future Value (FV)
                  <button onClick={solveForFV} className="text-xs text-brand-blue hover:text-brand-accent font-bold uppercase transition-colors">Solve</button>
                </label>
                <input 
                  type="text" 
                  value={fv} 
                  onChange={(e) => setFv(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all font-mono"
                  placeholder="$ 0.00"
                />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Timing</label>
                <div className="flex p-1 bg-slate-100 rounded-xl overflow-hidden border border-gray-200">
                  <button 
                    onClick={() => setType('0')}
                    className={`flex-1 py-2 text-sm font-bold uppercase rounded-lg transition-all ${type === '0' ? 'bg-white shadow text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                  >
                    End
                  </button>
                  <button 
                    onClick={() => setType('1')}
                    className={`flex-1 py-2 text-sm font-bold uppercase rounded-lg transition-all ${type === '1' ? 'bg-white shadow text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                  >
                    Begin
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Info size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Compounding Settings</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Payments / Year (P/Y)</label>
                <input 
                  type="number" 
                  value={py} 
                  onChange={(e) => setPy(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 py-1 text-sm focus:border-brand-accent outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Compounding / Year (C/Y)</label>
                <input 
                  type="number" 
                  value={cy} 
                  onChange={(e) => setCy(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 py-1 text-sm focus:border-brand-accent outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-center">
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors text-sm font-bold uppercase"
            >
              <RotateCcw size={16} />
              Reset All
            </button>
            <div className="text-[10px] text-gray-300 font-medium">Use positive values for inflows, negative values for outflows.</div>
          </div>
        </div>
      </motion.div>
    </div>
    </Layout>
  );
}
