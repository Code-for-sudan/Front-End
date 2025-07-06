import { userData } from "../../../data/user.js"; // this will be replace by the endpoint data
const Profile = () => {
  const storeInfo = userData.store_info;
  return (
    <div className="container mt-8 flex flex-col gap-4">
      <div className="flex items-center gap-4 p-2.5 border-2 border-light-gray rounded-md">
        <img src={userData.profile_pic} alt="profile-pic" className="size-18 rounded-full object-cover" />
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <p className="text-black">{userData.name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone}</p>
          <p>{userData.location}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col justify-center items-center gap-1 text-xs w-40 py-2 border border-primary rounded-md">
          <p>{storeInfo.products}</p>
          <p className="text-gray-500">المنتجات</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 text-xs w-40 py-2 border border-primary rounded-md">
          <p>{storeInfo.orders}</p>
          <p className="text-gray-500">الطلبات</p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-medium">بيانات المتجر</h4>
      </div>
    </div>
  )
}

export default Profile
