# Proyecto - Primer Parcial - DevOps Frontend

### Integrantes
- Jhonatan Cabezas - 70416 
- Luis Callapa - 68881
- Ernesto Juarez - 68763
- Diego Ledezma - 68779
- Adrian Sánchez - 69546

Breve repositorio frontend creado con Vite + React + TypeScript y TailwindCSS. Contiene una página de login y una página de éxito (redirección después de iniciar sesión).
- **Rutas principales:** `"/"` -> página de Login; `"/success"` -> página de éxito tras login.
- **Autenticación simple:** el `token` devuelto por el backend se guarda en `localStorage` bajo la clave `token`.
- **API:** las llamadas HTTP usan `src/api/axiosInstance.ts`. La `baseURL` viene de la variable de entorno `VITE_REACT_APP_API_URL` (por defecto `http://localhost:3000/api`).
- **Workflows:** hay un workflow de CI en `.github/workflows/cicd.yml`

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
El link al cual conectarse es: http://3.80.5.56:3001/ 