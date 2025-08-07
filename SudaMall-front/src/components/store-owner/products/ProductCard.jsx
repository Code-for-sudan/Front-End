import { CgTrash } from "react-icons/cg";
import { PiPencilLineBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    // redirect user to open edit product
    const handleEditProduct = (id) => {
        navigate(`/store-owner/${userId}/products/edit/${id}`)
    }
  return (
    <div
        className="border border-gray-300 bg-gray-50 p-3 rounded-md flex items-center justify-between gap-6 text-xs"
        >
        <div className="flex-1 flex items-center gap-2">
            <img src={product.picture} alt="product" width={60} height={60} className="rounded" loading="lazy" />
            <div className="flex flex-col gap-2">
                <p>{product.product_name}</p>
                <p>{product.price}ج</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2 w-18">
            <p className={`text-center text-white py-1 px-2 rounded-lg ${product.available_quantity === 0 ? 'bg-red-600' : 'bg-green-700'}`}>
              {product.available_quantity === 0 ? 'غير متوفر' : 'متوفر'}
            </p>
            <p className="text-center">{product.category}</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 text-lg">
            <button 
                onClick={() => handleEditProduct(product.id)}
                className="cursor-pointer">
                <PiPencilLineBold />
            </button>
            <button className="cursor-pointer">
                <CgTrash />
            </button>
        </div>
    </div>
  )
}

export default ProductCard
