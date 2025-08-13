import { CgTrash } from "react-icons/cg";
import { PiPencilLineBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../../../hooks/useDeleteProduct";
import { ConfirmPopUp } from "../../reusableGlobal";

const ProductCard = ({product}) => {
    const { mutate: deleteProduct } = useDeleteProduct();

    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    // redirect user to open edit product
    const handleEditProduct = (id) => {
        navigate(`/store-owner/${userId}/products/edit/${id}`)
    }

    // handle delete product by id 
    const handleDeleteProduct = async (productId) => {
    const confirmed = await ConfirmPopUp(`انت متاكد يازول داير تحذف المنتج ${product.product_name} ؟`);
    if (confirmed) {
      deleteProduct({ id: productId });
    }
  };
  return (
    <div
        className="border border-gray-300 bg-gray-50 p-3 rounded-md flex items-center justify-between gap-6 text-xs"
        >
        <div className="flex-1 flex items-center gap-2">
            <img src={product.picture} alt="product" width={60} height={60} className="rounded size-14 object-contain" loading="lazy" />
            <div className="flex flex-col gap-2">
                <p>{product.product_name}</p>
                <p>{product.price}ج</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2 w-18">
            <p className={`text-center text-white py-1 px-2 rounded-lg ${product.availability === 'available' ? 'bg-green-700' : 'bg-red-700'}`}>
              {product.availability !== 'available' ? 'غير متوفر' : 'متوفر'}
            </p>
            <p className="text-center">{product.category}</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 text-lg">
            <button 
                onClick={() => handleEditProduct(product.id)}
                className="cursor-pointer">
                <PiPencilLineBold />
            </button>
            <button 
                onClick={() => handleDeleteProduct(product.id)}
                className="cursor-pointer">
                <CgTrash />
            </button>
        </div>
    </div>
  )
}

export default ProductCard
