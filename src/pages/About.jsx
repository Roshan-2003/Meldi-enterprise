import { Link } from "react-router-dom";
import { Award, ShieldCheck, Truck, Wrench } from "lucide-react";

import { categories } from "../data/categories";

const About = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Quality-Verified Materials",
      desc: "Every bandsaw blade, blower, heater, and industrial tool undergoes strict inspection before dispatch.",
    },
    {
      icon: Wrench,
      title: "Custom Engineering Specs",
      desc: "We support custom blade lengths, heater wattages, blower capacities, and OEM procurement requirements.",
    },
    {
      icon: Truck,
      title: "Reliable Pan-India Supply",
      desc: "Streamlined logistics from our Ahmedabad hub to manufacturing plants and workshops across India.",
    },
    {
      icon: Award,
      title: "Dedicated Technical Support",
      desc: "Our application specialists help you select the exact grade and capacity for your machinery.",
    },
  ];

  return (
    <main className="bg-gray-50 pb-16 md:pb-20">
      {/* Header */}
      <section className="bg-slate-900 py-12 text-white md:py-16">
        <div className="page-container">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
            About IndustrialMart
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">
            Trusted Partner for Engineering Materials
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Based in Ahmedabad, Gujarat, IndustrialMart supplies high-performance
            cutting blades, industrial blowers, process heaters, and precision
            maintenance tools to factories, OEMs, and workshops.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="page-container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={24} />
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Categories */}
      <section className="page-container pb-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Our Core Product Divisions
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Select a category to explore specifications or request a quotation.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <div className="rounded-lg bg-slate-900 p-3 text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{cat.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-100 pt-8">
            <Link
              to="/products"
              className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse Product Catalog
            </Link>
            <Link
              to="/contact"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Generate Quotation Inquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
