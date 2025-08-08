export const mapProductToFormData = (product) => {
  const formatDate = (date) => (date ? date.split("T")[0] : "");

  return {
    product_name: product.product_name || "",
    product_description: product.product_description || "",
    brand: product.brand || "",
    price: product.price || "",
    classification: product.classification || "",
    category: product.category || "",
    picture: product.picture || null,
    color: product.color || "",
    tags: product.tags || [],
    has_sizes: product.has_sizes ?? null,
    available_quantity: product.available_quantity || "",
    sizes: product.has_sizes
      ? product.sizes
      : [{ size: "", available_quantity: "" }],
    offer: product.offer
      ? {
          ...product.offer,
          start_date: formatDate(product.offer.start_date),
          end_date: formatDate(product.offer.end_date),
        }
      : { offer_price: "", start_date: "", end_date: "" },
  };
};
