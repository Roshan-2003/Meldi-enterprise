
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productService";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const { products: list } = await getProducts();

        if (active) {
          setProducts(list.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <Hero />

      {/* Categories Section */}
      <section className="page-container py-12 sm:py-16 lg:py-20">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 sm:text-sm">
            Our Categories
          </p>

          <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:mt-3 sm:text-3xl lg:text-4xl">
            Explore Our Products
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:mt-4 sm:leading-7">
            Discover our wide range of industrial products
            designed to meet your engineering requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 sm:text-sm">
                Featured Collection
              </p>

              <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:mt-3 sm:text-3xl lg:text-4xl">
                Popular Products
              </h2>
            </div>

            <Link
              to="/products"
              className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
            >
              View All Products
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-xl border border-gray-200 bg-white sm:h-96"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500 sm:py-14">
              No products available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="page-container py-12 sm:py-16 lg:py-20">
        <div className="rounded-xl bg-slate-900 px-5 py-10 text-center sm:rounded-2xl sm:px-10 sm:py-12 lg:px-16 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Looking for Industrial Materials?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:mt-4 sm:leading-7">
            Tell us your requirements. Our team will help
            you find the right products and provide a quotation.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:px-7"
            >
              Generate Quotation Inquiry →
            </Link>

            <Link
              to="/inquiries"
              className="w-full rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:px-7"
            >
              Track Saved Inquiries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
