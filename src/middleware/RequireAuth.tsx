import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const RequireAuth = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Bạn chưa đăng nhập! Đang chuyển hướng...
        <Navigate to="/login" replace />
      </div>
    );
  }

  return <Outlet />;
};

export default RequireAuth;