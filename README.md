# 🏫 EspacioTEC – Sistema de Gestión de Espacios Académicos

> 12° Concurso de Programación – Nivel Avanzado  
> Foro ISC 2026 | TecNM Campus Martínez de la Torre  
> **Equipo: 404**

---

## 👥 Integrantes

- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

---

## 📋 Descripción del proyecto

**EspacioTEC** es una plataforma web que centraliza la gestión de espacios académicos (salones, laboratorios, centros de cómputo y aulas multiusos) de una institución de educación superior.

La solución permite visualizar en tiempo real el estado de cada espacio, gestionar horarios sin conflictos, registrar incidencias y controlar el acceso mediante roles diferenciados, eliminando el uso de registros manuales y sistemas aislados.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- Next.js 16 (React)
- CSS Modules / Tailwind CSS

### Backend
- Node.js + Express

### Base de datos
- MySQL

### Control de versiones
- Git + GitHub

### Herramientas de apoyo
- [Documentación oficial, MDN, Stack Overflow, etc.]
- IA generativa: Claude (Anthropic) — ver sección de declaración de uso de IA

---

## 🗂️ Estructura del proyecto

```
EspacioTEC/
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── views/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── database/
│   ├── schema.sql          ← Script de creación de tablas
│   └── seed.sql            ← Datos de prueba
├── docs/
│   └── diseño.pdf          ← Documento de diseño (máx. 2 cuartillas)
├── bitacora.md             ← Bitácora de desarrollo
└── README.md
```

---

## ⚙️ Instalación y ejecución

### Requisitos previos
- Node.js 18+
- MySQL 8.x o MariaDB
- npm o pnpm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/[usuario]/espaciotec.git
   cd espaciotec
   ```

2. **Crear la base de datos**
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p espaciotec < database/seed.sql
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de BD
   ```

4. **Instalar dependencias**
   ```bash
   # Frontend (Next.js)
   cd frontend
   npm install

   # Backend (Express)
   cd ../backend
   npm install
   ```

5. **Ejecutar el servidor**
   ```bash
   # Backend (Express) — desde /backend
   npm run dev

   # Frontend (Next.js) — desde /frontend
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

---

## 👤 Usuarios de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Administrador | admin@tec.mx | Admin123 |
| Área Académica | academica@tec.mx | Acad123 |
| Prefecto | prefecto@tec.mx | Pref123 |

---

## 🔑 Módulos del sistema

- **Autenticación** – Login seguro con control de sesiones y roles
- **Gestión de espacios** – CRUD de salones, laboratorios y aulas con capacidad y equipamiento
- **Horarios** – Asignación, consulta y validación de conflictos de horario
- **Estado en tiempo real** – Visualización de disponibilidad: Libre / Ocupado / Mantenimiento
- **Incidencias** – Registro de ausencias docentes y fallas en espacios
- **Mantenimiento** – Seguimiento básico de fallas reportadas

---

## 🤖 Declaración de uso de Inteligencia Artificial

**Herramienta utilizada:** Claude (Anthropic) – [claude.ai](http://claude.ai) y ChatGPT (OpenAI)

---

## 📬 Entrega

Repositorio enviado al correo: **concurso.isc@martineztorre.tecnm.mx**

---

*12° Concurso de Programación – Foro ISC 2026 | TecNM Campus Martínez de la Torre*
