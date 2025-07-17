const ProfileHeader = ({ user }) => (
  <div className="flex items-center gap-4 p-2.5 border-2 border-light-gray rounded-md">
    <img
      src={user.profile_pic}
      alt="profile-pic"
      className="size-18 rounded-full object-cover"
    />
    <div className="flex flex-col gap-1 text-xs text-gray-500">
      <p className="text-black">{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.location}</p>
    </div>
  </div>
);

export default ProfileHeader;