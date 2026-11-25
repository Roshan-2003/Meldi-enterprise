import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  Copy,
  Download,
  FileText,
  RotateCcw,
  Send,
} from "lucide-react";

import { categories } from "../data/categories";
import { fallbackProducts } from "../data/products";
import { createInquiry, formatInquirySlip } from "../services/inquiryService";

const UNITS = ["Pieces", "Units", "Sets", "Meters", "Kg", "Boxes"];

const InquiryForm = ({
  product = null,
  defaultCategory = "",
  productsList = fallbackProducts,
  title = "Generate Product Inquiry",
  subtitle = "Fill in your requirements below to generate an official quotation inquiry reference.",
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [generatedInquiry, setGeneratedInquiry] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    categoryName:
      product?.category?.name || defaultCategory || categories[0]?.name || "General Enquiry",
    productId: product?._id || "",
    productName: product?.name || "",
    productSku: product?.sku || "",
    quantity: product?.minOrderQty || 1,
    unit: product?.unit || "Units",
    message: "",
  });

  useEffect(() => {
    if (product) {
      setForm((prev) => ({
        ...prev,
        categoryName: product.category?.name || prev.categoryName,
        productId: product._id || "",
        productName: product.name || "",
        productSku: product.sku || "",
        quantity: product.minOrderQty || prev.quantity || 1,
        unit: product.unit || prev.unit || "Units",
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setForm((prev) => ({
        ...prev,
        productId: "",
        productName: "",
        productSku: "",
      }));
      return;
    }

    const found = productsList.find((item) => item._id === selectedId);
    if (found) {
      setForm((prev) => ({
        ...prev,
        productId: found._id,
        productName: found.name,
        productSku: found.sku || "",
        categoryName: found.category?.name || prev.categoryName,
        quantity: found.minOrderQty || prev.quantity || 1,
        unit: found.unit || prev.unit || "Units",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.customerName.trim()) {
      nextErrors.customerName = "Full name is required.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (form.phone.replace(/\D/g, "").length < 7) {
      nextErrors.phone = "Enter a valid contact number.";
    }
    if (!form.quantity || Number(form.quantity) < 1) {
      nextErrors.quantity = "Quantity must be at least 1.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message =
        "Please describe your specifications or inquiry details (min 10 characters).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const inquiry = await createInquiry(form);
      setGeneratedInquiry(inquiry);
      toast.success(`Inquiry ${inquiry.referenceId} generated!`);
    } catch (err) {
      toast.error(err.message || "Failed to generate inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySlip = async () => {
    if (!generatedInquiry) return;
    try {
      await navigator.clipboard.writeText(formatInquirySlip(generatedInquiry));
      toast.success("Inquiry slip copied to clipboard!");
    } catch {
      toast.error("Unable to copy to clipboard.");
    }
  };

  const handleDownloadSlip = () => {
    if (!generatedInquiry) return;
    const text = formatInquirySlip(generatedInquiry);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${generatedInquiry.referenceId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setGeneratedInquiry(null);
    setForm((prev) => ({
      ...prev,
      message: "",
    }));
  };

  if (generatedInquiry) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-emerald-100 p-2.5 text-emerald-700">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Inquiry Generated Successfully
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Ref: {generatedInquiry.referenceId}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Generated on{" "}
                {new Date(generatedInquiry.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {generatedInquiry.status}
          </span>
        </div>

        <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">Contact Person</p>
            <p className="font-semibold text-slate-900">
              {generatedInquiry.customerName}
              {generatedInquiry.companyName
                ? ` (${generatedInquiry.companyName})`
                : ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email &amp; Phone</p>
            <p className="font-semibold text-slate-900">
              {generatedInquiry.email} • {generatedInquiry.phone}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Product / Category</p>
            <p className="font-semibold text-slate-900">
              {generatedInquiry.productName || generatedInquiry.categoryName}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Required Quantity</p>
            <p className="font-semibold text-slate-900">
              {generatedInquiry.quantity} {generatedInquiry.unit}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-500">Requirement Notes</p>
            <p className="mt-0.5 text-slate-700">{generatedInquiry.message}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopySlip}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-gray-50"
          >
            <Copy size={16} />
            Copy Slip
          </button>

          <button
            type="button"
            onClick={handleDownloadSlip}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-gray-50"
          >
            <Download size={16} />
            Download Slip
          </button>

          <Link
            to="/inquiries"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FileText size={16} />
            View All Inquiries
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="ml-auto flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            <RotateCcw size={15} />
            New Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Full Name *
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Patel"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
              errors.customerName
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Company / Organization
          </label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. Apex Engineering Pvt. Ltd."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="purchase@company.com"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
              errors.phone
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Category or Locked Product */}
        {product ? (
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Selected Product
            </label>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-sm">
              <span className="font-semibold text-slate-900">
                {product.name}
              </span>
              {product.sku && (
                <span className="rounded bg-white px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  SKU: {product.sku}
                </span>
              )}
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Product Category
              </label>
              <select
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                <option value="Custom / Multiple Categories">
                  Custom / Multiple Categories
                </option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Specific Product (Optional)
              </label>
              <select
                name="productId"
                value={form.productId}
                onChange={handleProductSelect}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">-- Any / Custom Requirement --</option>
                {productsList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              min={1}
              value={form.quantity}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                errors.quantity
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {errors.quantity && (
              <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Unit
            </label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City / Delivery Location */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Delivery Location / City
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Ahmedabad, Gujarat"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Message / Specifications */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Technical Specifications &amp; Requirement Details *
          </label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Mention dimensions, voltage, wattage, TPI, material grade, or expected delivery timeline..."
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
              errors.message
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send size={17} />
        {submitting ? "Generating Inquiry..." : "Generate Quotation Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;
