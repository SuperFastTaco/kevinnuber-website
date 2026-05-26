/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import Home from './pages/Home';
import Process from './pages/Process';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Personal from './pages/Personal';
import TVMCalculator from './pages/TVMCalculator';
import MarketHistoryCalculator from './pages/MarketHistoryCalculator';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="process" element={<Process />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="personal" element={<Personal />} />
          <Route path="tvm-calculator" element={<TVMCalculator />} />
          <Route path="market-history-calculator" element={<MarketHistoryCalculator />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
