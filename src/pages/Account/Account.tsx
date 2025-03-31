import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Bạn chưa đăng nhập.</p>
        <button onClick={() => navigate("/login")}>Đăng nhập</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Thông tin tài khoản</h2>
      <img src={user.image} alt="avatar" style={{ width: 120, borderRadius: "50%" }} />
      <p><strong>Họ tên:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Giới tính:</strong> {user.gender === "male" ? "Nam" : "Nữ"}</p>
    </div>
  );
};

export default Account;