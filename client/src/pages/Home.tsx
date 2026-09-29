import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logoutUser } from "../redux/slices/authSlice";

function Home() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={{ maxWidth: "600px", margin: "4rem auto", padding: "1rem" }}>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
}

export default Home;