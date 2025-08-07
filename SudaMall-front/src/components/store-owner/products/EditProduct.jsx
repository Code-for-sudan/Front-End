import React, { useEffect, useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Offer from "./Offer";
import ProductModal from "./ProductModal";
import { useUpdateProduct } from "../../../hooks/useUpdateProduct";
import { useGetSingleProduct } from "../../../hooks/useGetProducts";
import { MainLoading } from "../../loadings";

const EditProduct = () => {
  // mutation function for updating product
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const navigate = useNavigate();
  const params = useParams();
  const ProductId = parseInt(params.product_id);

  const { data: product, isLoading, isError } = useGetSingleProduct(ProductId);

  // format date function
  const formatDate = (isoString) => {
  return isoString ? isoString.split("T")[0] : "";
};

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
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
         offer: product?.offer
          ? {
              ...product.offer,
              start_date: formatDate(product.offer.start_date),
              end_date: formatDate(product.offer.end_date),
            }
          : {
              offer_price: "",
              start_date: "",
              end_date: "",
            },
      });
    }
  }, [product]);

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
    }
  };

  if (isLoading || !formData) return <MainLoading />;
  if (isError) return <p>حدث خطأ أثناء تحميل المنتج</p>;

  return (
    <div className="bg-white container px-4 py-6 max-w-xl">
      <div className="relative flex items-center justify-center w-full mb-6">
        <MdOutlineArrowCircleRight
          onClick={handleCloseEdit}
          className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">تعديل المنتج</h2>
      </div>

      {/* pending updates */}
      { isPending && <MainLoading text="تحديث المنتج..." />}
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
