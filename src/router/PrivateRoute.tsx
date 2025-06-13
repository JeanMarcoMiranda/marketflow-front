import { useAuthStore } from "@/store/useAuthStore"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />
}

export default PrivateRoute;