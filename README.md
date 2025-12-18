# Proyecto - Tercer Parcial - DevOps Backend
Integrantes
Jhonatan Cabezas - 70416
Luis Callapa - 68881
Ernesto Juarez - 68763
Diego Ledezma - 68779
Adrian Sánchez - 69546

## Descripción del Proyecto
Sistema web full-stack para gestión de usuarios desarrollado con arquitectura de microservicios. El proyecto implementa un CRUD completo con autenticación JWT, utilizando tecnologías modernas y buenas prácticas de DevOps.

###  Arquitectura

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  PostgreSQL │
│  (React +   │      │  (Node.js + │      │  (Database) │
│   Vite)     │      │   Prisma)   │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
  Puerto 80           Puerto 3000          Puerto 5432
```

## Inicio rapido

### Clone del repositorio
```bash
git clone https://github.com/LushoCallapa/DevOps2.git
```
### Configuración
El archivo `.env.example` ya está configurado en la raíz del proyecto, es necesario modificarlo a valores reales para poder probar de manera local si se quisiera.

### Levantar los Servicios
```bash
docker-compose up --build
```
### Probar la Aplicación
1. Abre el url necesario en tu navegador
2. Crea un nuevo usuario desde la interfaz
3. Inicia sesión con las credenciales creadas
4. Prueba las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)

---


##  Desarrollo Local

### Backend:
```bash
cd backend
npm install
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Base de Datos:
```bash
cd database
docker build -t myapp-db .
docker run -p 5432:5432 myapp-db
```

---

---

## Funcionalidades

### Backend
- Registro e inicio de sesión con JWT
- CRUD completo de usuarios
- API RESTful con Express + TypeScript
- Persistencia con Prisma ORM
- Migraciones automáticas de base de datos
- Logging centralizado con Winston
- Autenticación md5 optimizada para clientes GUI
- Scripts de backup y restauración de BD

### Frontend
- Interfaz moderna con React + Tailwind CSS
- Sistema de modales reutilizables
- Gestión de usuarios con formularios interactivos
- Manejo de sesiones con JWT (localStorage)
- Botón de logout
- UX mejorada: backdrop blur y click-outside-to-close
- Iconos intuitivos para acciones (✏️ editar, 🗑️ eliminar, ➕ crear)
- Responsive design

### DevOps & Monitoreo
- Docker Compose con orquestación de servicios
- Prometheus para recolección de métricas
- Grafana para visualización de dashboards
- Loki para logs centralizados
- Promtail para agregación de logs
- Node Exporter para métricas del sistema
- CI/CD con GitHub Actions
- Despliegue automatizado en EC2
---