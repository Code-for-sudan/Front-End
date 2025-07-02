import { MainTitle } from '../../../components/reusable';
import { SearchBar } from '../../../components/reusable';
import Test from '../../../api/Test';

const Products = () => {
  return (
    <div className='container'>
      <MainTitle
        title={"إدارة المنتجات"}
         navigatePath={'/store-owner/:userId/dashboard'} />
      <SearchBar />
      {/* <Test /> */}
    </div>
  )
}

export default Products;
