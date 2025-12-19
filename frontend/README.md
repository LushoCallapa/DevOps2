# Proyecto - Tercer Parcial - DevOps Frontend

### Integrantes
- Jhonatan Cabezas - 70416 
- Luis Callapa - 68881
- Ernesto Juarez - 68763
- Diego Ledezma - 68779
- Adrian Sánchez - 69546

Frontend moderno creado con Vite + React 19 + TypeScript y Tailwind CSS. Interfaz intuitiva para gestión de usuarios con autenticación JWT.

**Características principales:**
- **Rutas:**
	- `"/"` → Página de Login (autenticación)
	- `"/success"` → Dashboard de gestión de usuarios (protegido)
- **Autenticación:** Token JWT guardado en `localStorage` bajo la clave `token`
- **Componentes modulares:**
	- `Modal.tsx` → Componente modal reutilizable con backdrop blur
	- `CreateUserModal.tsx` → Formulario para crear usuarios
	- `EditUserModal.tsx` → Formulario para editar usuarios
	- `DeleteConfirmModal.tsx` → Confirmación de eliminación
- **API:** Llamadas HTTP centralizadas en `src/api/axiosInstance.ts` con `VITE_REACT_APP_API_URL`
- **UX Mejorada:**
	- Click-outside-to-close en modales
	- Botones con iconos (✏️ editar, 🗑️ eliminar, ➕ crear)
	- Diseño responsivo y gradiente azul
	- Botón de logout

**Workflow de despliegue (resumen)**
- El workflow se dispara al hacer `push` a la rama `master`.
- Pasos principales:
	- Hace `checkout` del repositorio en el runner de GitHub Actions.
	- Se conecta por SSH al servidor EC2 (usa `appleboy/ssh-action`) y crea la carpeta de destino.
	- Copia todos los archivos al EC2 mediante `scp` (`appleboy/scp-action`).
	- Crea un archivo `.env` en el EC2 usando el secreto `ENV_BACKEND_API_URL` para definir `VITE_REACT_APP_API_URL`.
	- En el EC2 instala dependencias, construye la app y reinicia el proceso con `pm2` para servir los archivos estáticos.
- Secrets usados: `EC2_HOST`, `EC2_USER`, `EC2_KEY`, `ENV_BACKEND_API_URL`.

Prerequisitos
- Node.js (recomendado v18+).
- npm disponible.

### Aclaración
El proyecto como tal se ejecuta a traves de ec2s ya configurados en AWS, no es necesario correrlo localmente, y por consecuencia no se necesita la instalación de dependencias ni un .env.
El link al cual conectarse es: http://18.213.192.54/ 