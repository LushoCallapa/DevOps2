import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, type User } from "../services/userService";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  // Modales
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // Crear usuario
  const handleUserCreated = (newUser: User) => {
    setUsers((prev: User[]) => [...prev, newUser]);
  };

  // Editar usuario
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev: User[]) =>
      prev.map((u: User) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditModalOpen(false);
  };

  // Eliminar usuario
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser?.id) return;

    setDeleteLoading(true);
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev: User[]) => prev.filter((u: User) => u.id !== selectedUser.id));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <p className="text-gray-500 text-sm mt-1">Administra y controla los usuarios del sistema</p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-xl"></span> Nuevo Usuario
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay usuarios</h2>
            <p className="text-gray-600 mb-6">Comienza creando el primer usuario del sistema</p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Crear Primer Usuario
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-center font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: User) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-blue-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{user.id}</td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded-lg transition transform hover:scale-110"
                            title="Editar usuario"
                          >
                            <span className="text-xl">✏️</span>
                          </button>

                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition transform hover:scale-110"
                            title="Eliminar usuario"
                          >
                            <span className="text-xl">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Total: <span className="font-semibold text-gray-800">{users.length}</span> usuario(s)
              </p>
            </div>
          </div>
        )}
      </div>

      <CreateUserModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onUserCreated={handleUserCreated}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        userName={selectedUser?.email || ""}
        loading={deleteLoading}
      />
    </div>
  );
}
