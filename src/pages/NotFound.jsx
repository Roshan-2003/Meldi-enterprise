import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-6 md:py-24">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
        404 Error
      </p>
      <h1 className="mt-3 text-4xl font-bold text-slate-900">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        The page you requested does not exist. Use the links below to continue
        browsing or generate a product inquiry.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
        <Link
          to="/products"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-gray-50"
        >
          View Products
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
