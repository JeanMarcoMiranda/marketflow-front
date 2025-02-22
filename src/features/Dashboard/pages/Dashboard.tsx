import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.user.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
