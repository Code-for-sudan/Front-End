import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MainTitle = ({ title, navigatePath }) => {
    const navigate = useNavigate();
    
    return (
        <div className="relative flex items-center justify-center w-full mt-8 mb-6">
        <MdOutlineArrowCircleRight
            onClick={() => navigate(navigatePath)}
            className="absolute top-0 right-0 w-8 h-8 cursor-pointer"
        />
        <h2 className="text-base font-bold">{title}</h2>
        </div>
    )
}

export default MainTitle;