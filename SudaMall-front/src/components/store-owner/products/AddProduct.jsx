import { useDispatch } from 'react-redux';
import { closeAddProduct } from '../../../app/AppStats';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import { useState } from 'react';
import ProductModal from './ProductModal';
import { useCreateProduct } from '../../../hooks/useCreateProduct';

const AddProduct = () => {
  const dispatch = useDispatch();
  const createProductMutation = useCreateProduct();

  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    brand: '',
    price: '',
    type: '',
    category: '',
    picture: null,
    color: '',
    has_sizes: null,
    available_quantity: "",
    sizes: [{ size: '', quantity: '' }],
  });

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
    createProductMutation.mutate(formData);
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
      <ProductModal 
        handleSubmit={handleSubmit}
        handleCloseProduct={handleCloseProduct}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
        />
    </div>
  );
};

export default AddProduct;
