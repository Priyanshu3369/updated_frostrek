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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 32);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-[#06060C] ${
          scrolled
            ? "border-b border-cyan-500/20 shadow-lg shadow-cyan-900/10"
            : "border-b border-transparent"
        }`}
      >
        <div className="flex max-w-full items-center justify-between px-6 md:px-12 py-3.5">
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-100 transition-colors hover:text-cyan-300 flex-shrink-0"
            onClick={closeMenu}
          >
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

        {/* Mobile menu with enhanced slide-down animation */}
        <div
          className={`border-t border-cyan-500/20 bg-[#06060C] shadow-lg md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 px-5 py-4 text-sm font-medium text-slate-200">
            {links.map((link, index) =>
              link.type === "route" ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 transition-all duration-500 ${isActive(link.href)
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "hover:bg-cyan-500/10 hover:text-cyan-200"
                    } ${isOpen ? "translate-x-0 opacity-100 scale-100" : "-translate-x-8 opacity-0 scale-95"}`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 80}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 transition-all duration-500 hover:bg-cyan-500/10 hover:text-cyan-200 ${
                    isOpen ? "translate-x-0 opacity-100 scale-100" : "-translate-x-8 opacity-0 scale-95"
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 80}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            <Link
              to="/get-in-touch"
              onClick={closeMenu}
              className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-teal-900/30 transition-all duration-500 hover:shadow-xl hover:shadow-teal-800/50 hover:scale-105 mt-3 text-center block ${
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-90"
              }`}
              style={{ 
                transitionDelay: isOpen ? `${links.length * 80 + 100}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;