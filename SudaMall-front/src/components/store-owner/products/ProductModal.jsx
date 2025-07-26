import React, { useEffect } from 'react'
import { FileUploader } from '../reusable';
import { useFileUpload } from '../../../hooks'

// arrays for product types and categories
const productTypes = ['ملابس', 'أحذية', 'أجهزة', 'شنط', 'إكسسوارات', 'أخرى'];
const productCategories = ['رجال', 'نساء', 'أطفال بنات', 'أطفال أولاد'];

// allowed files for product image
const allowedTypes = ["image/png", "image/jpeg"];

const ProductModal = ({ handleSubmit, formData, handleChange, setFormData, handleCloseProduct}) => {

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* product name  */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">اسم المنتج</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* product description  */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">وصف المنتج</label>
          <textarea
            name="description"
            id="description"
            rows="3"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.description}
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
          <label htmlFor="type" className="block text-sm font-medium mb-1">نوع المنتج</label>
          <select
            name="type"
            id="type"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">اختر نوع المنتج</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* product category: men - women - kids */}
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
                formData.has_sizes === true ? "bg-primary text-white" : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, has_sizes: true }))}
            >
              نعم
            </button>
            <button
              type="button"
              className={`text-sm px-4 py-2 rounded border ${
                formData.has_sizes === false ? "bg-primary text-white" : "bg-white text-gray-700 border-gray-300"
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
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">الكمية</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
            value={formData.quantity}
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
                    value={item.quantity}
                    onChange={(e) => {
                      const updatedSizes = [...formData.sizes];
                      updatedSizes[index].quantity = e.target.value;
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
                  sizes: [...prev.sizes, { size: '', quantity: '' }],
                }))
              }
              className="mt-2 text-sm text-primary border border-primary px-2 py-1 rounded"
            >
              + إضافة مقاس
            </button>

            <p className="text-xs text-gray-600 mt-2">* يمكنك إضافة أكثر من مقاس مع الكمية الخاصة به</p>
          </div>
          )}

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
