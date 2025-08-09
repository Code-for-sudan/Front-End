// compare to object and return true if the are equal
export const compareFromData = (initialData, formData) => {
  if (!initialData) return true; // no initial data, so consider changed

  // Compare primitive fields
  const fieldsToCheck = [
    "product_name",
    "product_description",
    "brand",
    "price",
    "classification",
    "category",
    "color",
    "sizes",
    "available_quantity",
  ];

  for (const field of fieldsToCheck) {
    if (formData[field] !== initialData[field]) return true;
  }

  // Compare picture by reference or simple string equality
  if (
    (formData.picture && initialData.picture && formData.picture !== initialData.picture) ||
    (formData.picture && !initialData.picture) ||
    (!formData.picture && initialData.picture)
  )
    return true;

  // Compare tags array
  if (
    formData.tags.length !== initialData.tags.length ||
    formData.tags.some((tag, i) => tag !== initialData.tags[i])
  )
    return true;

  // Compare sizes array (objects)
  if (
    JSON.stringify(formData.sizes) !== JSON.stringify(initialData.sizes) ||
    formData.sizes.length !== initialData.sizes.length ||
    formData.sizes.some(
      (size, i) =>
        size.size !== initialData.sizes[i].size ||
        size.available_quantity !== initialData.sizes[i].available_quantity
    )
  )
    return true;

  // Compare offer object (if exists)
  if (
    (formData.offer && !initialData.offer) ||
    (!formData.offer && initialData.offer)
  )
    return true;

  if (
    formData.offer &&
    initialData.offer &&
    (
      formData.offer.offer_price !== initialData.offer.offer_price ||
      formData.offer.start_date !== initialData.offer.start_date ||
      formData.offer.end_date !== initialData.offer.end_date
    )
  )
    return true;

  // If none differ, return false (no changes)
  return false;
};
