import React, { useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Offer from "./Offer";
import ProductModal from "./ProductModal";
import { useUpdateProduct } from "../../../hooks/useUpdateProduct";

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const ProductId = parseInt(params.product_id);

  // mutation function for updating product
  const { mutate: updateProduct } = useUpdateProduct();

  const [formData, setFormData] = useState({
    product_name: "الحذاء الذهبي",
    product_description: "حذاء رياضي اصلي",
    brand: "اوريجينال",
    price: "60000",
    classification: "رجال",
    category: "أحذية",
    picture: null,
    color: "ذهبي",
    tags: ["رياضة", "كرة قدم"],
    has_sizes: "true",
    available_quantity: "",
    sizes: [{ size: "40", available_quantity: "7" }],
    offer: {
      offer_price: "",
      start_date: "",
      end_date: "",
    },
  });

  const [active, setActive] = useState("edit");
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

  // go back from editing
  const handleCloseEdit = () => {
    navigate(-1);
  };

  // handle form offer change
  const handleOfferChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        [name]: value,
      },
    }));
  };

  // enable and disable offer function
  const toggleOffer = () => {
    setFormData((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        is_active: !prev.offer.is_active,
      },
    }));
  };

  // handle submit form changes
  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm();

    if (validated) {
      updateProduct({
        productId: ProductId,
        productData: formData, // your state object
      });

      console.log("form data:", formData);
    }
  };

  return (
    <div className="bg-white container px-4 py-6 max-w-xl">
      <div className="relative flex items-center justify-center w-full mb-6">
        <MdOutlineArrowCircleRight
          onClick={handleCloseEdit}
          className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">تعديل المنتج</h2>
      </div>

      {/* switch between edit and add offer buttons */}
      <div className="flex items-center justify-center gap-6 text-sm px-6 my-8">
        <button
          onClick={() => setActive("edit")}
          className={`${
            active === "edit" ? "text-primary underline" : "text-gray-400"
          }`}
        >
          بيانات المنتج
        </button>
        <button
          onClick={() => setActive("offer")}
          className={`${
            active === "offer" ? "text-primary underline" : "text-gray-400"
          }`}
        >
          إضافة عرض
        </button>
      </div>
      {active === "edit" ? (
        <ProductModal
          handleSubmit={handleSubmit}
          handleCloseProduct={handleCloseEdit}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      ) : (
        <Offer
          onSubmit={handleSubmit}
          formData={formData}
          toggleOffer={toggleOffer}
          handleOfferChange={handleOfferChange}
        />
      )}
    </div>
  );
};

export default EditProduct;
