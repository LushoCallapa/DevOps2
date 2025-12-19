# Proyecto - Tercer Parcial - DevOps Backend

### Integrantes
- Jhonatan Cabezas - 70416
- Luis Callapa - 68881
- Ernesto Juarez - 68763
- Diego Ledezma - 68779
- Adrian Sánchez - 69546

Backend con Express + TypeScript y Prisma (PostgreSQL). Provee una API RESTful para usuarios (registro/login/gestión completa) usando el modelo `User` definido en `prisma/schema.prisma`. La conexión a la base de datos se toma desde la variable de entorno `DATABASE_URL`.

**Mejoras:**
- Autenticación mejorada con método md5 para mejor compatibilidad
- Usuario default insertado por migración automática
- Logging centralizado con Winston
- Mejor manejo de errores y validaciones

- **Rutas principales:**
	- `POST /api/users` (registro/creación) — definidas en `src/routes/userRoutes.ts`
	- `GET /api/users` (obtener todos los usuarios)
	- `PUT /api/users/:id` (actualizar usuario)
	- `DELETE /api/users/:id` (eliminar usuario)
	- Rutas gestionadas por `src/controllers/userController.ts`

- **Persistencia:**
	- ORM: `Prisma` con `prisma/schema.prisma`.
	- `DATABASE_URL` controla host/puerto/usuario/contraseña/base de datos. Ejemplo de formato:
		`postgres://usuario:password@host:5432/nombre_basedatos`
	- El cliente Prisma se inicializa en `src/db.ts`.

- **Autenticación y secretos:**
	- `JWT_SECRET` se espera en el `.env` para firmar tokens.
	- Contraseñas hasheadas con bcryptjs
	- Token/flujo de autenticación gestionado por el backend.
	- Token almacenado en frontend con `localStorage`.

- **Migraciones:**
	- Archivo de migración inicial: `prisma/migrations/20251122181517_init/`
	- Usuario default creado por: `prisma/migrations/20251209_add_default_user/`
	- Email: `test1@example.com` / Contraseña: `123456`

**Workflow de despliegue**
- El workflow en `.github/workflows/cicd.yml` se dispara al hacer `push` a `master`.
- Pasos clave:
	- `checkout` del repo en el runner.
	- Conexión por SSH al servidor EC2 y creación del directorio destino.
	- Copia de todos los archivos al EC2 mediante `scp`.
	- Creación de un archivo `.env` en el EC2 usando secretos (`ENV_DATABASE_URL`, `ENV_JWT_SECRET`, `ENV_PORT`) — ahí es donde se inyecta la `DATABASE_URL`.
	- Instalación de dependencias, build (`npm run build`) y reinicio con `pm2` del servicio (`pm2 start dist/src/server.js --name backend`).

- **Secrets usados en CI:** `EC2_HOST`, `EC2_USER`, `EC2_KEY`, `ENV_DATABASE_URL`, `ENV_JWT_SECRET`, `ENV_PORT`.

**Backups y logs**
- **Backup:** Script `backup_db.sh` realiza `pg_dump` de la base de datos:
	- Credenciales configurables por variables de entorno
	- Backups comprimidos guardados en `db_backups/`
	- Script de restauración: `db_backups/restore_backup.sh`
- **Logs:** Escritura centralizada en `logs/backend.log` usando Winston:
	- Nivel de logs: info, error, warn
	- Integración con Loki para visualización en Grafana
	- Formato: timestamp, nivel, mensaje

### Aclaración
El proyecto como tal se ejecuta a traves de ec2s ya configurados en AWS, no es necesario correrlo localmente, y por consecuencia no se necesita la instalación de dependencias ni un .env.
El link al cual conectarse es: http://18.213.192.54:3000/api/users/ 


