import { Link } from "react-router-dom";
import {
  Factory,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../assets/meldi enterprise.jpeg"


const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="page-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
    <div className="rounded-lg   text-white">
            <img src={logo} className="h-12 w-12" alt="MELDI Enterprise Logo" />
          </div>
            <h2 className="text-xl font-bold">
              MELDI<span className="text-blue-400 p-2">ENTERPRISE</span>
            </h2>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Your trusted destination for quality engineering
            materials and industrial product solutions.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Quick Links</h3>

          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/products" className="hover:text-white">Products</Link>
            <Link to="/inquiries" className="hover:text-white">Inquiries</Link>
            <Link to="/about" className="hover:text-white">About Us</Link>
            <Link to="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-semibold">Contact Information</h3>

          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p className="flex items-center gap-3">
              <Phone size={17} /> +91 99983 76277
            </p>

            <p className="flex items-center gap-3">
              <Mail size={17} /> meldienterprise76@gmail.com
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={17} /> Chhatral, Gujarat, India
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="page-container py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} IndustrialMart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
