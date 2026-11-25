import API from "./api";

const STORAGE_KEY = "industrialmart_inquiries";
const INQUIRY_EVENT = "industrialmart:inquiries-updated";

const generateReferenceId = () => {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `INQ-${datePart}-${randomPart}`;
};

const notifyListeners = () => {
  window.dispatchEvent(new Event(INQUIRY_EVENT));
};

export const getStoredInquiries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveStoredInquiries = (inquiries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  notifyListeners();
};

export const createInquiry = async (formData) => {
  const referenceId = generateReferenceId();
  const createdAt = new Date().toISOString();

  const payload = {
    referenceId,
    customerName: formData.customerName.trim(),
    companyName: formData.companyName?.trim() || "",
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    city: formData.city?.trim() || "",
    categoryName: formData.categoryName || "General Enquiry",
    productId: formData.productId || "",
    productName: formData.productName || "",
    productSku: formData.productSku || "",
    quantity: Number(formData.quantity) || 1,
    unit: formData.unit || "Units",
    message: formData.message.trim(),
  };

  let synced = false;
  let serverRecord = null;

  try {
    const { data } = await API.post("/inquiries", payload, { timeout: 4000 });
    synced = true;
    serverRecord = data?.inquiry || data || null;
  } catch (error) {
    // Surface explicit 4xx validation errors from a live backend
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      const serverMsg =
        error.response.data?.message || "Invalid inquiry details. Please check your input.";
      throw new Error(serverMsg);
    }
    // Otherwise backend is offline/unreachable; save generated inquiry locally
  }

  const inquiry = {
    id: serverRecord?._id || serverRecord?.id || referenceId,
    referenceId: serverRecord?.referenceId || referenceId,
    ...payload,
    status: synced ? "Submitted to Server" : "Generated",
    synced,
    createdAt: serverRecord?.createdAt || createdAt,
  };

  const existing = getStoredInquiries();
  saveStoredInquiries([inquiry, ...existing]);

  return inquiry;
};

export const deleteInquiry = (id) => {
  const updated = getStoredInquiries().filter(
    (item) => item.id !== id && item.referenceId !== id
  );
  saveStoredInquiries(updated);
  return updated;
};

export const clearAllInquiries = () => {
  saveStoredInquiries([]);
};

export const formatInquirySlip = (inquiry) => {
  const lines = [
    "=========================================",
    "       INDUSTRIALMART - QUOTATION INQUIRY",
    "=========================================",
    `Reference ID : ${inquiry.referenceId}`,
    `Date         : ${new Date(inquiry.createdAt).toLocaleString()}`,
    `Status       : ${inquiry.status}`,
    "-----------------------------------------",
    "CUSTOMER DETAILS",
    `Name         : ${inquiry.customerName}`,
    inquiry.companyName ? `Company      : ${inquiry.companyName}` : null,
    `Email        : ${inquiry.email}`,
    `Phone        : ${inquiry.phone}`,
    inquiry.city ? `Location     : ${inquiry.city}` : null,
    "-----------------------------------------",
    "REQUIREMENT DETAILS",
    `Category     : ${inquiry.categoryName}`,
    inquiry.productName ? `Product      : ${inquiry.productName}` : null,
    inquiry.productSku ? `SKU          : ${inquiry.productSku}` : null,
    `Quantity     : ${inquiry.quantity} ${inquiry.unit}`,
    "",
    "Specifications / Message:",
    inquiry.message,
    "=========================================",
  ].filter((line) => line !== null);

  return lines.join("\n");
};

export const INQUIRY_EVENTS = {
  UPDATED: INQUIRY_EVENT,
};
