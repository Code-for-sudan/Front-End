import React from 'react'
import { MainTitle } from '../../../components/reusable';
import { SearchBar } from '../../../components/reusable';

const Products = () => {
  return (
    <div className='container'>
      <MainTitle
        title={"إدارة المنتجات"}
         navigatePath={'/store-owner/:userId/dashboard'} />
      <SearchBar />
    </div>
  )
}

export default Products;
