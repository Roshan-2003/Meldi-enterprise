import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ProductCard = ({ product }) => {
  const imageSrc = product.images?.[0] || "/placeholder.svg";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
      <Link to={`/products/${product._id}`}>
        <div className="flex h-56 items-center justify-center overflow-hidden bg-gray-50">
          <img
            src={imageSrc}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.svg";
            }}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {product.category?.name || "Industrial Product"}
          </p>
          {product.sku && (
            <span className="text-[11px] font-medium text-gray-400">
              {product.sku}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-lg font-bold text-slate-900">
          <Link
            to={`/products/${product._id}`}
            className="hover:text-blue-600 transition"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-slate-900 hover:text-blue-600"
        >
          View Details
          <ArrowUpRight size={18} />
        </Link>

        <Link
          to={`/products/${product._id}#enquiry`}
          className="mt-3 block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
