import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

function          ProtectedRoute() {
  const { isAuthenticated, initialized } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;