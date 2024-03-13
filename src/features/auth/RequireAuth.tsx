import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const accessToken = useSelector(selectCurrentToken);
  const location = useLocation();
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
