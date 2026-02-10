# Portal Productor - Instalación Rápida

## 🚀 Quick Start

### 1. Variables de Entorno
Crea `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_key_aqui
```

### 2. Ejecutar en Supabase

**En el SQL Editor, ejecuta en orden:**

1. `supabase-schema-complete.sql` - Schema completo de base de datos
2. `supabase-storage-setup.sql` - Políticas de Storage (después de crear los buckets)

**En el Dashboard de Storage, crea estos buckets:**
- `documents-bucket` (private, 10MB max, PDF/images)
- `invoices-bucket` (private, 5MB max, PDF/XML)
- `contracts-bucket` (private, 10MB max, PDF)
- `chat-attachments` (private, 20MB max, multiple types)
- `technical-sheets` (public, 5MB max, PDF)

### 3. Instalar Dependencias

```bash
npm install @supabase/supabase-js
npm install recharts react-dropzone react-pdf
npm install lucide-react framer-motion
```

### 4. Probar
```bash
npm run dev
```

Visita:
- `/register` - Crear cuenta
- `/login` - Iniciar sesión  
- `/portal/dashboard` - Dashboard

## 📁 Archivos Creados

### SQL
- `supabase-schema-complete.sql` - Schema principal (14 tablas)
- `supabase-storage-setup.sql` - Configuración de Storage
- `supabase-setup.sql` - Schema básico (solo auth)

### TypeScript
- `lib/supabase.ts` - Cliente y helpers de auth
- `lib/types.ts` - Tipos completos del sistema

### Páginas
- `app/login/page.tsx` - Login con Supabase
- `app/register/page.tsx` - Registro con validación
- `app/portal/dashboard/page.tsx` - Dashboard protegido

### Documentación
- `SUPABASE_SETUP.md` - Guía completa de configuración
- `INSTALL.md` - Esta guía

## ✅ Checklist de Configuración

- [ ] Crear proyecto en Supabase
- [ ] Copiar credenciales a `.env.local`
- [ ] Ejecutar `supabase-schema-complete.sql`
- [ ] Crear los 5 buckets de Storage
- [ ] Ejecutar `supabase-storage-setup.sql`
- [ ] Habilitar Email Provider en Auth
- [ ] Configurar URLs de redirección
- [ ] Instalar dependencias NPM
- [ ] Probar registro e inicio de sesión

## 🎯 Próximos Pasos

Lee `implementation_plan.md` para ver el plan completo de desarrollo de las 8 fases del Portal Productor.

Fase 1 ✅ Completada
Fase 2 🔄 En progreso: Módulo de Documentos
