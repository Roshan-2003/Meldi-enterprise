import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Factory,
  ArrowUpRight,
} from "lucide-react";
import logo from "../assets/meldi enterprise.jpeg"

import { getStoredInquiries, INQUIRY_EVENTS } from "../services/inquiryService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(() => getStoredInquiries().length);

  useEffect(() => {
    const syncCount = () => setInquiryCount(getStoredInquiries().length);
    window.addEventListener(INQUIRY_EVENTS.UPDATED, syncCount);
    window.addEventListener("storage", syncCount);
    return () => {
      window.removeEventListener(INQUIRY_EVENTS.UPDATED, syncCount);
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Inquiries", path: "/inquiries", badge: inquiryCount },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="page-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg   text-white">
            <img src={logo} className="h-15 w-15" alt="MELDI Enterprise Logo" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              MELDI<span className="text-blue-600 p-2">ENTERPRISE</span>
            </h1>
            <p className="text-[10px] tracking-[2px] text-gray-500">
              ENGINEERING MATERIALS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {link.name}
              {typeof link.badge === "number" && link.badge > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Quote Button */}
        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:flex"
        >
          Get a Quote
          <ArrowUpRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-900 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="page-container py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between text-sm font-medium ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                <span>{link.name}</span>
                {typeof link.badge === "number" && link.badge > 0 && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
