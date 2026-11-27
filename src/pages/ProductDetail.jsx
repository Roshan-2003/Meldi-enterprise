import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShieldCheck,
} from "lucide-react";

import { getProductById, getProducts } from "../services/productService";
import InquiryForm from "../components/InquiryForm";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const loadDetail = async () => {
      const { product: found } = await getProductById(id);
      if (!active) return;

      setProduct(found);
      setLoading(false);

      if (found?.category?.slug) {
        const { products: sameCategory } = await getProducts({
          category: found.category.slug,
        });
        if (active) {
          setRelated(sameCategory.filter((item) => item._id !== found._id).slice(0, 3));
        }
      }
    };

    loadDetail();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-container py-16">
        <div className="h-96 animate-pulse rounded-2xl bg-gray-100" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 md:py-24">
        <h1 className="text-3xl font-bold text-slate-900">Product Not Found</h1>
        <p className="mt-3 text-sm text-gray-500">
          The product you are looking for may have been moved or removed.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/products"
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse All Products
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-gray-50"
          >
            Send Custom Inquiry
          </Link>
        </div>
      </main>
    );
  }

  const imageSrc = product.images?.[0] || "/placeholder.svg";

  return (
    <main className="bg-gray-50 pb-16 md:pb-20">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="page-container flex flex-wrap items-center gap-2 py-4 text-xs font-medium text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          {product.category?.slug && (
            <>
              <span>/</span>
              <Link
                to={`/products?category=${product.category.slug}`}
                className="hover:text-blue-600"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="font-semibold text-slate-900">{product.name}</span>
        </div>
      </div>

      {/* Product Overview */}
      <section className="page-container pt-10">

        <div className="grid gap-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          {/* Image */}
          <div className="flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            <img
              src={imageSrc}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.svg";
              }}
              className="h-[340px] w-full object-cover md:h-[420px]"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                {product.category?.name || "Industrial Product"}
              </span>
              {product.sku && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  SKU: {product.sku}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                Available for Bulk &amp; Custom Orders
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {product.name}
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            {product.minOrderQty && (
              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
                <Package size={15} className="text-blue-600" />
                Min. Order Quantity: {product.minOrderQty} {product.unit || "Units"}
              </div>
            )}

            {/* Features */}
            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Key Features
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#enquiry"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Generate Quote Inquiry ↓
              </a>
              <Link
                to="/contact"
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-gray-50"
              >
                General Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {Array.isArray(product.specifications) && product.specifications.length > 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Technical Specifications
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-200">
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <th className="w-1/3 px-5 py-3.5 font-semibold text-slate-800">
                        {spec.label}
                      </th>
                      <td className="px-5 py-3.5 text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Product Inquiry Generator Section */}
      <section id="enquiry" className="page-container scroll-mt-24 pt-12">
        <InquiryForm
          product={product}
          title={`Request a Quote for ${product.name}`}
          subtitle="Generate an official quotation inquiry for this product. You will receive an instant inquiry reference slip."
        />
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="page-container pt-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Related Products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
