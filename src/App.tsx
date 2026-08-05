import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { SeriesDetail } from './pages/SeriesDetail';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F5F3EF] transition-colors duration-500 relative selection:bg-[#1A1A1A] selection:text-white flex flex-col justify-between">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series/:slug" element={<SeriesDetail />} />
          <Route path="/series" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
