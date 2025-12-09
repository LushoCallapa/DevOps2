import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-6">
      <div className="backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 rounded-3xl p-10 w-full max-w-2xl animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-6">¡Te logeaste, felicidades!</h1>

        <p className="text-center text-white/90 mb-6">
          Has iniciado sesión correctamente. Disfruta la aplicación 🎉
        </p>

        <div className="flex justify-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1d2a7f3d6b4b9d5d3a9b3a4a5f6f7e8b"
            alt="Felicidades" 
            className="rounded-2xl shadow-lg max-h-64 object-cover"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
