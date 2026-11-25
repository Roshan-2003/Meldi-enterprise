import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { categories } from "../data/categories";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const loadProducts = async () => {
      const { products: list } = await getProducts({
        category: activeCategory,
        search: searchTerm,
      });

      if (active) {
        setProducts(list);
        setLoading(false);
      }
    };

    loadProducts();
    return () => {
      active = false;
    };
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (slug) => {
    const next = new URLSearchParams(searchParams);
    if (slug === "all") {
      next.delete("category");
    } else {
      next.set("category", slug);
    }
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  const activeCategoryObj = categories.find((c) => c.slug === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-slate-900 py-14 text-white">
        <div className="page-container">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Product Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            {activeCategoryObj ? activeCategoryObj.name : "All Industrial Products"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            {activeCategoryObj
              ? activeCategoryObj.description
              : "Browse our complete range of precision bandsaw blades, blowers, industrial heaters, and engineering tools."}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="page-container py-10">
        <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <SlidersHorizontal size={14} />
              Filter:
            </span>

            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === cat.slug
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products or SKU..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-9 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Meta */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
          <p>
            Showing <span className="font-semibold text-slate-900">{products.length}</span>{" "}
            {products.length === 1 ? "product" : "products"}
          </p>

          {(activeCategory !== "all" || searchTerm) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No matching products found
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Need a custom specification or unlisted industrial item? You can still
              generate a custom quotation inquiry directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-gray-50"
              >
                Show All Products
              </button>
              <Link
                to="/contact"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
