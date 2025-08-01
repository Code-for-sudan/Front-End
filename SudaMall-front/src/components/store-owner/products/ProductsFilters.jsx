import { useState } from 'react';
import ProductCard from './ProductCard';

// Dummy product types and statuses
const productTypes = ['كل الفئات', 'ملابس', 'أجهزة', 'شنط', 'إكسسوارات', 'أخرى'];
const statusOptions = ['كل الحالات', 'متوفر', 'غير متوفر'];

const ProductFilters = ({products}) => {
  const [selectedType, setSelectedType] = useState('كل الفئات');
  const [selectedStatus, setSelectedStatus] = useState('كل الحالات');

  const filteredProducts = products.filter((product) => {
    const matchType = selectedType === 'كل الفئات' || product.product_type === selectedType;
    const matchStatus =
      selectedStatus === 'كل الحالات' ||
      (selectedStatus === 'متوفر' && product.quantity > 0) ||
      (selectedStatus === 'غير متوفر' && product.quantity === 0);
    return matchType && matchStatus;
  });

  return (
    <div className="pb-4 w-full mb-10">
      {/* Filter controls */}
      <div className="flex gap-4 mb-4 text-xs">
        {/* Product Type Filter */}
        <div className='flex-1'>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md text-center p-2 w-full focus:outline-none focus:ring"
          >
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Status Filter */}
        <div className='flex-1'>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md text-center p-2 w-full focus:outline-none focus:ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtered product results */}
      <div className="flex flex-col gap-2">
        {filteredProducts.map((product, index) => (
          <ProductCard 
            key={index}
            product={product}
            />
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
