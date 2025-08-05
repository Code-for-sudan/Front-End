import { MainTitle } from '../../../components/store-owner/reusable';
import { SearchBar } from '../../../components/store-owner/reusable';
import { AddProductBtn, ProductFilters } from '../../../components/store-owner/products';

import { StoreProductsData } from '../../../data/StoreProductsData';

const Products = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  return (
    <div className='container flex flex-col gap-6'>
      <MainTitle
        title={"إدارة المنتجات"}
         navigatePath={`/store-owner/${userId}/dashboard`} />
      <SearchBar />
      <AddProductBtn />
      <ProductFilters products={StoreProductsData} />
    </div>
  )
}

export default Products;
