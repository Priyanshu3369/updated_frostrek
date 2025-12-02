import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import usePerformanceMode from "../hooks/usePerformanceMode";

const links = [
  { label: "Home", href: "/", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Services", href: "/services", type: "route" },
  { label: "FAQs", href: "/faqs", type: "route" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const performanceMode = usePerformanceMode();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
<<<<<<< HEAD
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 32);
=======
      const current = window.scrollY;

      if (current < lastScrollY) setIsVisible(true);
      else if (current > lastScrollY && current > 100) setIsVisible(false);

      setScrolled(current > 32);
      setLastScrollY(current);
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <header
<<<<<<< HEAD
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-[#06060C] ${
          scrolled
            ? "border-b border-cyan-500/20 shadow-lg shadow-cyan-900/10"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex max-w-full items-center justify-between px-6 md:px-12 py-3.5">
=======
        className={`fixed inset-x-0 top-0 z-50 transition-all backdrop-blur-md duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "border-b border-teal-400/20 bg-teal-900/10"
            : "bg-teal-900/5"
        } ${
          performanceMode
            ? "shadow-sm"
            : "shadow-[0_10px_30px_rgba(0,128,128,0.15)]"
        }`}
      >
        <div className="flex max-w-full items-center justify-between px-6 md:px-12 py-2">
          
          {/* LOGO */}
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-100 hover:text-cyan-300"
            onClick={closeMenu}
          >
<<<<<<< HEAD
            <span className="inline-flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Frostrek AI"
                className="h-10 w-10 md:h-12 md:w-12 object-contain brightness-125 drop-shadow-md"
              />
            </span>
            <span
              className="text-lg md:text-2xl font-bold leading-tight tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              frostrek
=======
            <img
              src="/logo.png"
              alt="Frostrek AI"
              className="h-12 w-12 md:h-14 md:w-14 object-contain brightness-125"
            />
            <span className="text-xl md:text-3xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]">
              Frostrek
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative group px-3 py-1 transition-colors hover:text-cyan-300"
              >
                {link.label}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-cyan-400 
                    transition-transform duration-300 origin-left 
                    group-hover:scale-x-100
                    ${isActive(link.href) ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </Link>
            ))}

            {/* CTA */}
            <Link
              to="/get-in-touch"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-teal-800/50"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 hover:text-cyan-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
<<<<<<< HEAD
          className={`border-t border-cyan-500/20 bg-[#06060C] shadow-lg md:hidden overflow-hidden transition-all duration-500 ease-out ${
=======
          className={`md:hidden border-t border-teal-400/20 bg-teal-900/10 backdrop-blur-md transition-all duration-500 overflow-hidden ${
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 px-5 py-4 text-sm font-medium text-slate-200">
            {links.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className={`relative px-3 py-2 rounded-lg transition-all duration-500 ${
                  isActive(link.href)
                    ? "bg-cyan-500/20 text-cyan-200"
                    : "hover:bg-cyan-500/10 hover:text-cyan-200"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 80}ms` : "0ms",
                }}
              >
                {link.label}

                {/* MOBILE UNDERLINE */}
                <span
                  className={`
                    absolute left-3 bottom-1 h-[2px] w-10 bg-cyan-300 rounded-full transition-opacity duration-300 
                    ${isActive(link.href) ? "opacity-100" : "opacity-0"}
                  `}
                />
              </Link>
            ))}

            <Link
              to="/get-in-touch"
              onClick={closeMenu}
              className="mt-3 text-center group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-lg"
            >
              <span className="relative z-10">Get in Touch</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
