import React, { useEffect, useState } from 'react'
import { FileUploader } from '../reusable';
import { useFileUpload } from '../../../hooks'

// arrays for product types and categories
const productCategories = ['ملابس', 'أحذية', 'أجهزة', 'شنط', 'إكسسوارات', 'أخرى'];
const classification = ['الكل' ,'رجال', 'نساء', 'أطفال بنات', 'أطفال أولاد'];

// form data tags field limits
const MAX_TAGS = 3;
const MAX_TAG_LENGTH = 20;

// allowed files for product image
const allowedTypes = ["image/png", "image/jpeg"];

const ProductModal = ({ handleSubmit, formData, handleChange, setFormData, handleCloseProduct}) => {
    const [tagInput, setTagInput] = useState("");

    // file upload functions from useFileUpload hook
    const {
        selectedFile,
        setSelectedFile,
        dragActive,
        setDragActive,
        inputRef,
        handleFileChange,
        handleDrop,
    } = useFileUpload(allowedTypes);

    
    useEffect(() => {
    if (selectedFile) {
        setFormData((prev) => ({
        ...prev,
        picture: selectedFile,
        }));
    }
    }, [selectedFile]);

  // handle tag input function
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // add tags when enter key pressed or separate tags by comma
  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();

      if (formData.tags.length >= MAX_TAGS) return;

      const newTag = tagInput.trim().slice(0, MAX_TAG_LENGTH);
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
        setTagInput("");
      }
    }
  };

  // remove tag function
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* product name  */}
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium mb-1">اسم المنتج</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* product description  */}
        <div>
          <label htmlFor="product_description" className="block text-sm font-medium mb-1">وصف المنتج</label>
          <textarea
            name="product_description"
            id="product_description"
            rows="3"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.product_description}
            onChange={handleChange}
            required
          />
        </div>
        {/* product brand */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-1">العلامة التجارية ( الماركة )</label>
          <input
            type="text"
            name="brand"
            id="brand"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        {/* price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">السعر (ج.س)</label>
          <input
            type="number"
            name="price"
            id="price"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* product type: devices - clothes - shoes - etc  */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">الفئة</label>
          <select
            name="category"
            id="category"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">اختر الفئة</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* product classification: men - women - kids */}
        <div>
          <label htmlFor="classification" className="block text-sm font-medium mb-1">تصنيف المنتج</label>
          <select
            name="classification"
            id="classification"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.classification}
            onChange={handleChange}
            required
          >
            <option value="">اختر تصنيف المنتج</option>
            {classification.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* upload product image */}
         <FileUploader
            label="قم بإرفاق صورة للمنتج"
            hint="الملفات المسموح بها: png, jpeg"
            inputRef={inputRef}
            handleFileChange={handleFileChange}
            handleDrop={handleDrop}
            dragActive={dragActive}
            setDragActive={setDragActive}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />

          {/* select product color */}
        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">اللون</label>
          <input
            type="text"
            name="color"
            id="color"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        {/* Question: Does the product have sizes? */}
        <div>
          <label className="block text-sm font-medium mb-2">هل المنتج لديه مقاسات؟</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`text-sm px-4 py-2 rounded border ${
                formData.has_sizes === true || formData.has_sizes === "true" ? "bg-primary text-white" : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, has_sizes: true }))}
            >
              نعم
            </button>
            <button
              type="button"
              className={`text-sm px-4 py-2 rounded border ${
                formData.has_sizes === false || formData.has_sizes === "false" ? "bg-primary text-white" : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, has_sizes: false }))}
            >
              لا
            </button>
          </div>
        </div>
         {/* if the product has sizes return (size + quantity inputs) else return quantity */}
        {formData.has_sizes === null ? null : formData.has_sizes === false ? 
        (
        <div>
          <label htmlFor="available_quantity" className="block text-sm font-medium mb-1">الكمية</label>
          <input
            type="number"
            name="available_quantity"
            id="available_quantity"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.available_quantity}
            onChange={handleChange}
            required
          />
        </div>
       
        )
        :
        (
          <div>
            <label className="block text-sm font-medium mb-2">المقاسات والكمية</label>
            
            <div className="flex flex-col gap-2">
              {formData.sizes.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="المقاس"
                    className="w-1/2 text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
                    value={item.size}
                    onChange={(e) => {
                      const updatedSizes = [...formData.sizes];
                      updatedSizes[index].size = e.target.value;
                      setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="الكمية"
                    className="w-1/2 text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
                    value={item.available_quantity}
                    onChange={(e) => {
                      const updatedSizes = [...formData.sizes];
                      updatedSizes[index].available_quantity = e.target.value;
                      setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
                    }}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSizes = formData.sizes.filter((_, i) => i !== index);
                        setFormData((prev) => ({ ...prev, sizes: updatedSizes }));
                      }}
                      className="text-red-500 text-xs"
                    >
                      حذف
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  sizes: [...prev.sizes, { size: '', available_quantity: '' }],
                }))
              }
              className="mt-2 text-sm text-primary border border-primary px-2 py-1 rounded"
            >
              + إضافة مقاس
            </button>

            <p className="text-xs text-gray-600 mt-2">* يمكنك إضافة أكثر من مقاس مع الكمية الخاصة به</p>
          </div>
          )}

          {/* Hashtags  */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">إضافة هاشتاق ( إختياري )</label>
          
          <div className="border border-gray-300 p-2 rounded-md">
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-primary text-white text-xs px-2 rounded"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 pr-1 text-white text-xl cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {formData.tags.length < MAX_TAGS && (
              <input
                type="text"
                name="tags"
                id="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
                placeholder="اكتب الهاشتاق واضغط Enter أو فاصلة"
              />
            )}
            <p className="text-xs pt-2 text-gray-500">
              * أقصى عدد هاشتاقات = {MAX_TAGS}، وأقصى عدد حروف لكل هاشتاق = {MAX_TAG_LENGTH}
            </p>
          </div>
        </div>

        {/* add and cancel addition buttons  */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 cursor-pointer mb-4"
          >
            حفظ المنتج
          </button>
          <button
            type="button"
            onClick={handleCloseProduct}
            className="w-full border-2 border-gray-300 text-gray-600 py-2 rounded-md cursor-pointer mb-4"
          >
            إلغاء
          </button>
        </div>
      </form>
  )
}

export default ProductModal;
