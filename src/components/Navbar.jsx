import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const links = [
  { label: "Home", href: "/", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Services", href: "/services", type: "route" },
  { label: "Blog", href: "/blog", type: "route" },
  { label: "Partners", href: "/campus", type: "route" },
  { label: "Talent", href: "/talent", type: "route" },
  { label: "FAQs", href: "/faqs", type: "route" },
];

const servicesDropdown = [
  { label: "AI Talent Acquisition & Deployment", sectionId: "ai-talent" },
  { label: "AI Model Training & Performance Optimization", sectionId: "model-training" },
  { label: "Tailored AI Development Solutions", sectionId: "tailored-ai" },
  { label: "AI Agents & Autonomous Systems", sectionId: "ai-agents" },
  {
    label: "More Services",
    href: "/bepartner",
  },
];

const partnersDropdown = [
  { label: "Partners", href: "/campus" },
  { label: "Be Partner", href: "/bepartner" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setPartnersOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleServiceClick = (item) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      closeMenu();
      return;
    }

    if (item.href) {
      navigate(item.href);
      closeMenu();
      return;
    }

    if (item.sectionId) {
      if (location.pathname === "/services") {
        scrollToSection(item.sectionId);
      } else {
        navigate("/services");
        setTimeout(() => {
          scrollToSection(item.sectionId);
        }, 100);
      }
    }

    closeMenu();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-[#061c21] ${scrolled
            ? "border-b border-cyan-500/20 shadow-lg shadow-cyan-900/10"
            : "border-b border-transparent"
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-3.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Frostrek AI"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
            <span className="text-lg md:text-2xl font-bold text-white tracking-wide">
              Frostrek
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
            {links.map((link) =>
              link.label === "Services" ? (
                <div key={link.href} className="relative group">
                  <Link
                    to="/services"
                    className={`rounded-full px-3 py-1 transition-colors ${isActive("/services")
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "hover:bg-cyan-500/10 hover:text-cyan-200"
                      }`}
                  >
                    Services
                  </Link>

                  {/* Desktop Services Dropdown */}
                  <div className="absolute left-0 top-full mt-3 w-80 rounded-xl border border-cyan-500/20 bg-[#061c21] shadow-xl shadow-cyan-900/30 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <ul className="py-2">
                      {servicesDropdown.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleServiceClick(item)}
                          className="w-full text-left block px-5 py-2.5 text-sm hover:bg-cyan-500/10 hover:text-cyan-200 transition"
                        >
                          {item.label}
                        </button>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : link.label === "Partners" ? (
                <div key={link.href} className="relative group">
                  <button
                    className={`rounded-full px-3 py-1 transition-colors ${isActive("/campus") || isActive("/bepartner")
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "hover:bg-cyan-500/10 hover:text-cyan-200"
                      }`}
                  >
                    Partners
                  </button>

                  {/* Desktop Partners Dropdown */}
                  <div className="absolute left-0 top-full mt-3 w-48 rounded-xl border border-cyan-500/20 bg-[#061c21] shadow-xl shadow-cyan-900/30 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <ul className="py-2">
                      {partnersDropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.href}
                          className="w-full text-left block px-5 py-2.5 text-sm hover:bg-cyan-500/10 hover:text-cyan-200 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
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
              )
            )}

            <Link
              to="/get-in-touch"
              className="rounded-full bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 font-semibold text-white hover:scale-105 transition"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col px-5 py-4 gap-2 text-slate-200">
            {links.map((link) =>
              link.label === "Services" ? (
                <div key={link.href} className="flex flex-col">
                  {/* Services Button */}
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 hover:bg-cyan-500/10 ${isActive("/services") ? "bg-cyan-500/20 text-cyan-200" : ""
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Mobile Services Dropdown */}
                  <div
                    className={`flex flex-col gap-1 pl-4 mt-1 overflow-hidden transition-all duration-300 ${servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    {servicesDropdown.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(item)}
                        className="text-left text-sm px-3 py-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : link.label === "Partners" ? (
                <div key={link.href} className="flex flex-col">
                  {/* Partners Button */}
                  <button
                    onClick={() => setPartnersOpen(!partnersOpen)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 hover:bg-cyan-500/10 ${isActive("/campus") || isActive("/bepartner") ? "bg-cyan-500/20 text-cyan-200" : ""
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${partnersOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Mobile Partners Dropdown */}
                  <div
                    className={`flex flex-col gap-1 pl-4 mt-1 overflow-hidden transition-all duration-300 ${partnersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    {partnersDropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.href}
                        onClick={closeMenu}
                        className="text-left text-sm px-3 py-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 hover:bg-cyan-500/10 ${isActive(link.href) ? "bg-cyan-500/20 text-cyan-200" : ""
                    }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <Link
              to="/get-in-touch"
              onClick={closeMenu}
              className="mt-3 rounded-full bg-teal-700 px-5 py-2.5 text-center text-white font-semibold"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;