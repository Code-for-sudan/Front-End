import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../app/UserInfo";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // Clear user data from Redux store (and localStorage via reducer)
    dispatch(clearUser());

    // Remove token from storage
    localStorage.removeItem("access_token");

    // Redirect to login page
    navigate("/auth");
  };

  return logout;
};
