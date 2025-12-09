import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, updateUser, deleteUser, type User } from "../services/userService";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  // Cargar usuarios al inicio
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear un nuevo usuario
  const handleCreateUser = async () => {
    if (!email || !password) return alert("Email y password son requeridos");
    setLoading(true);
    try {
      const newUser = await createUser({ email, password });
      setUsers((prev) => [...prev, newUser]);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Error creando el usuario");
    } finally {
      setLoading(false);
    }
  };

  // Preparar edición de usuario
  const handleEditClick = (user: User) => {
    setEditingUserId(user.id || null);
    setEditEmail(user.email);
    setEditPassword("");
  };

  // Guardar cambios de usuario
  const handleSaveEdit = async () => {
    if (editingUserId === null) return;
    try {
      const updatedUser = await updateUser(editingUserId, {
        email: editEmail,
        password: editPassword || undefined,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUserId ? updatedUser : u))
      );
      setEditingUserId(null);
      setEditEmail("");
      setEditPassword("");
    } catch (err) {
      console.error(err);
      alert("Error actualizando usuario");
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditEmail("");
    setEditPassword("");
  };

  // Eliminar usuario
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error eliminando usuario");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Formulario para crear usuario */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-64"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-64"
        />
        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="px-2 py-1 border rounded-md w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {editingUserId === user.id ? (
                    <>
                      <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="px-2 py-1 border rounded-md"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No hay usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
