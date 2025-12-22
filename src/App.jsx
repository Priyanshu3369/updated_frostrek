import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";
import Collaborate from "./sections/Collaborate";

import AboutPage from "./pages/About";
import FAQPage from "./pages/FAQs";
import ServicePage from "./pages/Services";
import GetInTouch from "./pages/GetInTouch";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

const Home = () => {
  return (
    <div className="bg-[#0B0B0E] text-[#FFFFFF] min-h-screen scroll-smooth">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <FAQs />
      <Collaborate />
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-[#0B0B0E] min-h-screen">
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} /> {/* ✅ move up */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/get-in-touch" element={<GetInTouch />} />
        <Route path="*" element={<Home />} /> {/* ✅ always last */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
