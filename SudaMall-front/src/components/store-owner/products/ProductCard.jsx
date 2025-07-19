import { CgTrash } from "react-icons/cg";
import { PiPencilLineBold } from "react-icons/pi";

const ProductCard = ({product}) => {
  return (
    <div
        className="border border-gray-300 bg-gray-50 p-3 rounded-md flex items-center justify-between gap-6 text-xs"
        >
        <div className="flex items-center gap-2">
            <img src={product.picture} alt="product" width={60} height={60} className="rounded" />
            <div className="flex flex-col gap-2">
                <p>{product.product_name}</p>
                <p>{product.price}ج</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <p className={`text-center text-white py-1 px-2 rounded-lg ${product.quantity === 0 ? 'bg-red-600' : 'bg-green-700'}`}>
              {product.quantity === 0 ? 'غير متوفر' : 'متوفر'}
            </p>
            <p>{product.product_type}</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 text-lg">
            <button className="cursor-pointer">
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
