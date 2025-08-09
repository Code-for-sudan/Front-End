import React, { useEffect, useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import Offer from "./Offer";
import ProductModal from "./ProductModal";
import { MainLoading } from "../../loadings";

import {
  useDeleteOffer,
  useUpdateProduct,
  useGetSingleProduct,
  useDeleteProductSize,
} from "../../../hooks";

import { 
  mapProductToFormData, 
  validateProductForm 
} from "../../../utils";
import { ConfirmPopUp } from "../../reusableGlobal";

const EditProduct = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const ProductId = parseInt(product_id, 10);

  // Hooks
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteOffer, isPending: deletingOffer } = useDeleteOffer();
  const { mutate: deleteSize, isPending: removingSize } = useDeleteProductSize();
  const { data: product, isLoading, isError } = useGetSingleProduct(ProductId);

  // Local State
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [errors, setErrors] = useState({});

  // Initialize form data when product loads
  useEffect(() => {
    if (product) {
      setFormData(mapProductToFormData(product));
    }
  }, [product]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      offer: { ...prev.offer, [name]: value },
    }));
  };

  const handleClose = () => navigate(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateProduct({ productId: ProductId, productData: formData });
    }
  };

  const handleDeleteOffer = async () => {
    const confirmed = await ConfirmPopUp("هل انت متأكد من أنك تريد حذف العرض؟");
    if (confirmed) {
      deleteOffer({ id: ProductId });
    }
  };

  const handleRemoveSize = async (SizeId) => {
    const confirmed = await ConfirmPopUp("هل انت متأكد من أنك تريد حذف المقاس؟")
    if (confirmed) {
     deleteSize({ ProductId, SizeId });
    }
  };

  // Loading/Error States
  if (isLoading || !formData) return <MainLoading />;
  if (isError) return <p>حدث خطأ أثناء تحميل المنتج</p>;

  const hasOffer = Boolean(product?.offer);

  return (
    <div className="bg-white container px-4 py-6 max-w-xl">
      {/* loaders updating/removing size/ deleting offer*/}
      {isUpdating && <MainLoading text="تحديث المنتج..." />}
      {removingSize && <MainLoading text="جاري حذف المقاس..." />}
      {deletingOffer && <MainLoading text="جاري حذف العرض" />}

      {/* Header */}
      <div className="relative flex items-center justify-center w-full mb-6">
        <MdOutlineArrowCircleRight
          onClick={handleClose}
          className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">تعديل المنتج</h2>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-6 text-sm px-6 my-8">
        <button
          onClick={() => setActiveTab("edit")}
          className={activeTab === "edit" ? "text-primary underline" : "text-gray-400"}
        >
          بيانات المنتج
        </button>
        <button
          onClick={() => setActiveTab("offer")}
          className={activeTab === "offer" ? "text-primary underline" : "text-gray-400"}
        >
          إضافة عرض
        </button>
      </div>

      {/* Content */}
      {activeTab === "edit" ? (
        <ProductModal
          handleSubmit={handleSubmit}
          handleCloseProduct={handleClose}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isEdit
          handleRemoveSize={handleRemoveSize}
        />
      ) : (
        <Offer
          onSubmit={handleSubmit}
          formData={formData}
          handleOfferChange={handleOfferChange}
          handleDeleteOffer={handleDeleteOffer}
          has_offer={hasOffer}
        />
      )}
    </div>
  );
};

export default EditProduct;
