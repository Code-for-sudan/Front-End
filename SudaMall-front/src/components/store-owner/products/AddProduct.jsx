import { useDispatch } from 'react-redux';
import { closeAddProduct } from '../../../app/AppStats';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import { useState } from 'react';
import FileUploader from '../profile/FileUploader';
import { useFileUpload } from '../../../hooks';

const productTypes = ['ملابس', 'أحذية', 'أجهزة', 'شنط', 'إكسسوارات', 'أخرى'];
const productCategories = ['رجال', 'نساء', 'أطفال بنات', 'أطفال أولاد'];

// allowed files for product image
const allowedTypes = ["image/png", "image/jpeg"];

const AddProduct = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    type: '',
    category: ''
  });

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
    const formData = new FormData();

    if (selectedFile) {
      formData.append("product_image", selectedFile);
      formData.append("product_name", formData.name);
    }
    console.log("form data:", formData)
  };

  return (
    <div className='fixed inset-0 h-[100dvh] z-[250] bg-white container px-4 py-6 overflow-y-auto'>
      <div className="relative flex items-center justify-center w-full mb-6">
        <MdOutlineArrowCircleRight
          onClick={handleCloseProduct}
          className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">إضافة منتج</h2>
      </div>

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

        {/* quantity */}
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
        {/* add and cancel addition buttons  */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 cursor-pointer mb-4"
          >
            إضافة المنتج
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
    </div>
  );
};

export default AddProduct;
