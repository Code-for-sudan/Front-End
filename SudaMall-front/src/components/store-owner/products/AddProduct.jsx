import { useDispatch } from "react-redux";
import { closeAddProduct } from "../../../app/AppStats";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCreateProduct } from "../../../hooks/useCreateProduct";
import { MainLoading } from "../../loadings";

const AddProduct = () => {
  const dispatch = useDispatch();
  const createProductMutation = useCreateProduct();
  const isLoading = createProductMutation.isPending;

  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    brand: "",
    price: "",
    classification: "",
    category: "",
    picture: null,
    color: "",
    tags: [],
    has_sizes: null,
    available_quantity: "",
    sizes: [{ size: "", available_quantity: "" }],
  });

  const [errors, setErrors] = useState({});

  // Validate the form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.classification) newErrors.classification = "التصنيف مطلوب";
    if (!formData.category) newErrors.category = "الفئة مطلوبة";
    if (!formData.picture) newErrors.picture = "صورة المنتج مطلوبة";
    if (formData.has_sizes === null)
      newErrors.has_sizes = "يرجى تحديد ما إذا كان المنتج يحتوي على مقاسات";

    if (formData.has_sizes === "true" || formData.has_sizes === true) {
      const hasValidSize = formData.sizes.some(
        (s) => s.size.trim() && s.available_quantity
      );
      if (!hasValidSize) {
        newErrors.sizes = "يرجى إضافة مقاس واحد على الأقل مع الكمية المتاحة";
      }
    } else if (
      (formData.has_sizes === "false" || formData.has_sizes === false) &&
      !formData.available_quantity
    ) {
      newErrors.available_quantity = "الكمية المتاحة مطلوبة للمنتج بدون مقاسات";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle input chang when the user type
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseProduct = () => {
    dispatch(closeAddProduct());
  };

  // handle submit form changes
  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm();

    if (validated) {
      createProductMutation.mutate(formData); // mutation function to post product creation
    }
  };

  return (
    <div className="fixed inset-0 h-[100dvh] z-[250] bg-white container px-4 py-6 overflow-y-auto">

      {/* spinner loading */}
      {isLoading && <MainLoading text="جاري حفظ المنتج..." />}

      {/* header text and back button */}
      <div className="relative flex items-center justify-center w-full mb-6">
        <MdOutlineArrowCircleRight
          onClick={handleCloseProduct}
          className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">إضافة منتج</h2>
      </div>

      {/* product form */}
      <ProductModal
        handleSubmit={handleSubmit}
        handleCloseProduct={handleCloseProduct}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isEdit={false}
      />
    </div>
  );
};

export default AddProduct;
