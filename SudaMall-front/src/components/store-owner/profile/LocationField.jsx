import { useDispatch } from 'react-redux';
import { openMap } from '../../../app/AppStats'
import { GrLocation } from "react-icons/gr";

const LocationField = ({ value }) => {
  const dispatch = useDispatch();

  const handleOpenMap = () =>{
    dispatch(openMap());
  }
  return(
    <div className="mb-3 flex flex-col gap-2">
      <label className="text-sm w-32 shrink-0">موقع المتجر</label>
      <div className="relative w-full flex items-center justify-between border border-gray-300 rounded text-xs">
        <div className="flex items-center gap-1 p-2">
          <GrLocation className="size-4 text-gray-700" />
          <p className="text-gray-400">{value}</p>
        </div>
        <button
          type="button"
          onClick={handleOpenMap}
          className="absolute -left-0.5 bg-primary border border-primary text-white text-xs px-2 py-2 rounded cursor-pointer"
        >
          تحديد
        </button>
      </div>
    </div>
  )};

export default LocationField;