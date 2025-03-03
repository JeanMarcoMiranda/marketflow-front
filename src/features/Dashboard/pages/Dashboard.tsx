import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function Dashboard() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Bienvenido,{" "}
          <span className="font-medium text-gray-700">{user?.user.email}</span>
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>

        <div className="mt-8 border-t pt-4 text-sm text-center text-gray-500">
          Última sesión: {new Date().toLocaleDateString()} -{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
