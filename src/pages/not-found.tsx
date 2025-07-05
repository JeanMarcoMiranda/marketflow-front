import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Página no encontrada</p>
      <p className="text-gray-500 mt-4 text-center">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
