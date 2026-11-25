import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const Icon = category.icon;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group rounded-xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-7"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition  ">
        <Icon size={28} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {category.name}
        </h3>

        {/* <ArrowUpRight
          size={20}
          className="text-gray-400 transition group-hover:text-blue-600"
        /> */}
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {category.description}
      </p>

      <p className="mt-5 text-sm font-semibold text-blue-600">
        Explore Category →
      </p>
    </Link>
  );
};

export default CategoryCard;