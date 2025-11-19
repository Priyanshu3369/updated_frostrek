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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const performanceMode = usePerformanceMode();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down (but show when near top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setScrolled(currentScrollY > 32);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all backdrop-blur-md duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled
        ? "border-b border-teal-400/20 bg-teal-900/10"
        : "bg-teal-900/5"
        } ${performanceMode ? "shadow-sm" : "shadow-[0_10px_30px_rgba(0,128,128,0.15)]"}`}
    >
      <div className="flex max-w-full items-center justify-between px-6 md:px-12 py-4">
        {/* Logo on the LEFT */}
        <Link
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-100 transition-colors hover:text-cyan-300 flex-shrink-0"
          onClick={closeMenu}
        >
          <span className="inline-flex items-center justify-center">
            <img
              src="/src/assets/frostrekf.png"
              alt="Frostrek AI"
              className="h-12 w-12 md:h-14 md:w-14 object-contain brightness-125 drop-shadow-md"
            />
          </span>
          <span
            className="text-xl md:text-3xl font-bold leading-tight tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Frostrek
          </span>
        </Link>

        {/* Navigation and CTA on the RIGHT */}
        <div className="flex items-center gap-6 ml-auto">
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            {links.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-full px-3 py-1 transition-colors ${isActive(link.href)
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "hover:bg-cyan-500/10 hover:text-cyan-200"
                    }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
                >
                  {link.label}
                </a>
              )
            )}
            <Link
              to="/get-in-touch"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-teal-900/30 transition-all hover:shadow-xl hover:shadow-teal-800/50 hover:scale-105"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-teal-400/20 bg-teal-900/10 backdrop-blur-md shadow-lg md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4 text-sm font-medium text-slate-200">
            {links.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 transition-colors ${isActive(link.href)
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "hover:bg-cyan-500/10 hover:text-cyan-200"
                    }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
                >
                  {link.label}
                </a>
              )
            )}
            <Link
              to="/get-in-touch"
              onClick={closeMenu}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-teal-900/30 transition-all hover:shadow-xl hover:shadow-teal-800/50 hover:scale-105 mt-3 text-center block"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;