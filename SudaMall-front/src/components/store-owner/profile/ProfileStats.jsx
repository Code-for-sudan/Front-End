const ProfileStats = ({ products, orders }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="flex flex-col justify-center items-center gap-1 text-xs w-40 py-2 border border-primary rounded-md">
      <p>{products}</p>
      <p className="text-gray-500">المنتجات</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-1 text-xs w-40 py-2 border border-primary rounded-md">
      <p>{orders}</p>
      <p className="text-gray-500">الطلبات</p>
    </div>
  </div>
);

export default ProfileStats;
