import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      {/* <h1>Página Pública</h1> */}
      <Outlet /> {/* Aquí se renderizan las páginas públicas */}
    </div>
  );
}
