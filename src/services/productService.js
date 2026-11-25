import API from "./api";
import { fallbackProducts } from "../data/products";

const filterProducts = (items, { category, search } = {}) => {
  return items.filter((item) => {
    const matchesCategory =
      !category ||
      category === "all" ||
      item.category?.slug === category ||
      item.category?.name?.toLowerCase() === category.toLowerCase();

    const query = search?.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.sku?.toLowerCase().includes(query) ||
      item.category?.name?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
};

export const getProducts = async (filters = {}) => {
  try {
    const { data } = await API.get("/products", { timeout: 3000 });
    const list = Array.isArray(data?.products)
      ? data.products
      : Array.isArray(data)
      ? data
      : [];

    if (list.length > 0) {
      return {
        products: filterProducts(list, filters),
        source: "api",
      };
    }
  } catch {
    // Fallback to built-in catalog when backend server is offline
  }

  return {
    products: filterProducts(fallbackProducts, filters),
    source: "catalog",
  };
};

export const getProductById = async (id) => {
  try {
    const { data } = await API.get(`/products/${id}`, { timeout: 3000 });
    const product = data?.product || (data?._id ? data : null);
    if (product) {
      return { product, source: "api" };
    }
  } catch {
    // Fallback to built-in catalog
  }

  const localMatch = fallbackProducts.find((item) => item._id === id) || null;
  return { product: localMatch, source: "catalog" };
};
