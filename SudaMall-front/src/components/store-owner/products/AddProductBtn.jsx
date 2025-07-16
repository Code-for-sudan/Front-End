import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openAddProduct } from "../../../app/AppStats";

const AddProductBtn = () => {
    const dispatch = useDispatch();

    // handle add product stat
    const handleClick = () => {
        dispatch(openAddProduct())
    }
    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 py-2 px-4 w-full text-sm bg-primary text-white rounded-md cursor-pointer active:scale-95"
            >
            <FiPlus className="size-5" />
            <p>إضافة منتج</p>
        </button>
    )
}

export default AddProductBtn;