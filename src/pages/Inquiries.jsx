import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ClipboardList,
  Copy,
  Download,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  clearAllInquiries,
  deleteInquiry,
  formatInquirySlip,
  getStoredInquiries,
  INQUIRY_EVENTS,
} from "../services/inquiryService";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(() => getStoredInquiries());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sync = () => setInquiries(getStoredInquiries());
    window.addEventListener(INQUIRY_EVENTS.UPDATED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(INQUIRY_EVENTS.UPDATED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const filtered = inquiries.filter((inq) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      inq.referenceId?.toLowerCase().includes(q) ||
      inq.customerName?.toLowerCase().includes(q) ||
      inq.companyName?.toLowerCase().includes(q) ||
      inq.productName?.toLowerCase().includes(q) ||
      inq.categoryName?.toLowerCase().includes(q)
    );
  });

  const handleCopy = async (inq) => {
    try {
      await navigator.clipboard.writeText(formatInquirySlip(inq));
      toast.success(`Copied ${inq.referenceId}`);
    } catch {
      toast.error("Failed to copy inquiry.");
    }
  };

  const handleDownload = (inq) => {
    const text = formatInquirySlip(inq);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${inq.referenceId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => {
    deleteInquiry(id);
    toast.success("Inquiry removed.");
  };

  const handleClearAll = () => {
    clearAllInquiries();
    toast.success("All saved inquiries cleared.");
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16 md:pb-20">
      {/* Header */}
      <section className="bg-slate-900 py-12 text-white md:py-14">
        <div className="page-container flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
              RFQ Tracker
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Generated Inquiries
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Review, copy, or download your generated quotation inquiry slips.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Generate New Inquiry
          </Link>
        </div>
      </section>

      {/* Body */}
      <section className="page-container pt-10">
        {inquiries.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Ref ID, product, or name..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-800"
            >
              Clear All History
            </button>
          </div>
        )}

        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <ClipboardList size={26} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No Inquiries Generated Yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Explore our industrial catalog or open the quotation form to
              generate your first inquiry reference slip.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Generate Inquiry Now
              </Link>
              <Link
                to="/products"
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-gray-50"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            No inquiries match "{searchTerm}".
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((inq) => (
              <div
                key={inq.id || inq.referenceId}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-lg font-bold text-slate-900">
                        {inq.referenceId}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-700">
                        {inq.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(inq.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(inq)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-50"
                    >
                      <Copy size={14} />
                      Copy Slip
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(inq)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-50"
                    >
                      <Download size={14} />
                      Download
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id || inq.referenceId)}
                      aria-label={`Delete inquiry ${inq.referenceId}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="font-semibold text-slate-900">
                      {inq.customerName}
                    </p>
                    {inq.companyName && (
                      <p className="text-xs text-gray-500">{inq.companyName}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="font-medium text-slate-800">{inq.email}</p>
                    <p className="text-xs text-gray-500">{inq.phone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Product / Category</p>
                    <p className="font-semibold text-slate-900">
                      {inq.productName || inq.categoryName}
                    </p>
                    {inq.productSku && (
                      <p className="text-xs text-gray-500">SKU: {inq.productSku}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Quantity &amp; Location</p>
                    <p className="font-semibold text-slate-900">
                      {inq.quantity} {inq.unit}
                    </p>
                    {inq.city && (
                      <p className="text-xs text-gray-500">{inq.city}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Requirement:{" "}
                  </span>
                  {inq.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Inquiries;
