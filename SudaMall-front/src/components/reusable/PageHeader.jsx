import { Link } from "react-router-dom";

const PageHeader = ({ title, backTo, icon }) => {
  return (
    <div className="relative p-2  text-base  flex items-center">
      <Link
        to={backTo}
        className="top-10 left-6 text-white hover:text-gray-200"
      >
        <img src={icon} alt="رجوع" className="h-5 w-5" />
      </Link>
      <span className="absolute left-1/2 transform -translate-x-1/2 ">
        {title}
      </span>
    </div>
  );
};

export default PageHeader;