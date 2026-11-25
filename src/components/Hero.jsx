
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-slate-900">
      <div className="page-container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">

        <div>
          <span className="inline-block rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-300">
            Industrial Engineering Solutions
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Quality Materials.
            <span className="block text-blue-400">
              Reliable Solutions.
            </span>
          </h1>

          <p className="mt-6 max-w-lg leading-7 text-slate-300">
            Explore premium industrial blades, blowers, heaters
            and engineering tools designed for professional
            industrial applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-lg border border-slate-500 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              <Phone size={17} />
              Contact Us
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h3 className="text-3xl font-bold text-white">04</h3>
              <p className="mt-1 text-sm text-slate-400">
                Product Categories
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">100%</h3>
              <p className="mt-1 text-sm text-slate-400">
                Customer Focus
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000"
            alt="Industrial engineering equipment"
            className="h-[350px] w-full rounded-2xl object-cover md:h-[470px]"
          />

          <div className="absolute bottom-3 left-3 rounded-xl bg-white p-4 shadow-xl sm:-bottom-5 sm:-left-5 sm:p-5">
            <p className="text-sm font-semibold text-slate-900">
              Industrial Product Solutions
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Quality • Reliability • Performance
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
