export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.classification) errors.classification = "التصنيف مطلوب";
  if (!formData.category) errors.category = "الفئة مطلوبة";
  if (!formData.picture) errors.picture = "صورة المنتج مطلوبة";
  if (formData.has_sizes === null)
    errors.has_sizes = "يرجى تحديد ما إذا كان المنتج يحتوي على مقاسات";

  if (formData.has_sizes) {
    const hasValidSize = formData.sizes.some(
      (s) => s.size.trim() && s.available_quantity
    );
    if (!hasValidSize)
      errors.sizes = "يرجى إضافة مقاس واحد على الأقل مع الكمية المتاحة";
  } else if (!formData.available_quantity) {
    errors.available_quantity = "الكمية المتاحة مطلوبة للمنتج بدون مقاسات";
  }

  return errors;
};
