# Configuración de Autenticación con Supabase

## Paso 1: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
```

### ¿Dónde encontrar estas credenciales?

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. En el menú lateral, haz clic en **Settings** → **API**
3. Encontrarás:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role**: `SUPABASE_SERVICE_ROLE_KEY` (mantener secreta)

## Paso 2: Configurar la Base de Datos

### Opción A: Schema Básico (Solo Autenticación)

Si solo necesitas autenticación básica:

1. Ve a **Table Editor** en tu proyecto de Supabase
2. Haz clic en **SQL Editor** en el menú lateral
3. Copia y pega el contenido completo del archivo `supabase-setup.sql`
4. Haz clic en **Run** para ejecutar el SQL

### Opción B: Schema Completo (Portal Productor Completo) ⭐ RECOMENDADO

Para todas las funcionalidades del Portal Productor:

1. Ve a **SQL Editor** en tu proyecto de Supabase
2. Copia y pega el contenido completo del archivo `supabase-schema-complete.sql`
3. Haz clic en **Run** para ejecutar el SQL

Esto creará:
- ✅ Tabla `profiles` para información de usuarios
- ✅ Tabla `documents` para expedientes legales
- ✅ Tabla `scale_tickets` para boletas de báscula
- ✅ Tabla `quality_analysis` para análisis de laboratorio
- ✅ Tabla `grain_inventory` para inventario de granos
- ✅ Tabla `settlements` para liquidaciones y pagos
- ✅ Tabla `land_plots` para predios georeferenciados
- ✅ Tabla `bank_accounts` para cuentas CLABE
- ✅ Tabla `notifications` para notificaciones
- ✅ Tabla `notification_settings` para configuración de alertas
- ✅ Tabla `support_tickets` para tickets de soporte
- ✅ Tabla `chat_messages` para mensajes de chat
- ✅ Tabla `insumos` para catálogo de productos
- ✅ Tabla `market_prices` para precios de mercado
- ✅ Tabla `government_support` para apoyos gubernamentales
- ✅ Políticas de Row Level Security (RLS) para proteger los datos
- ✅ Triggers automáticos para crear perfiles y actualizar timestamps
- ✅ Funciones auxiliares para cálculos y estadísticas

## Paso 3: Configurar Autenticación por Email

1. En Supabase Dashboard, ve a **Authentication** → **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Configura las opciones:
   - ✅ **Enable Email provider**
   - ✅ **Confirm email**: Activa si quieres que los usuarios confirmen su email
   - ⚙️ **Double confirm email changes**: Opcional

### Configurar Email Templates (Opcional pero Recomendado)

En **Authentication** → **Email Templates**, personaliza:
- **Confirm signup**: Email de confirmación de cuenta
- **Magic Link**: Email para login sin contraseña
- **Change Email Address**: Email para cambiar dirección de correo
- **Reset Password**: Email para recuperar contraseña

Puedes usar el dominio `grupoterminel.com` para el asunto y la marca.

## Paso 4: Configurar URL de Redirección

1. Ve a **Authentication** → **URL Configuration**
2. Agrega las siguientes URLs en **Redirect URLs**:
   ```
   http://localhost:3000/portal/dashboard
   https://tupdominio.com/portal/dashboard
   ```

## Paso 5: Probar la Autenticación

### Registro de Usuario

1. Ve a `http://localhost:3000/register`
2. Completa el formulario con:
   - RFC válido (13 caracteres)
   - Nombre completo
   - Correo electrónico
   - Teléfono
   - Empresa (opcional)
   - Contraseña (mínimo 6 caracteres)
3. Haz clic en **CREAR CUENTA**
4. Si tienes confirmación de email habilitada, revisa tu correo

### Inicio de Sesión

1. Ve a `http://localhost:3000/login`
2. Ingresa tu correo y contraseña
3. Haz clic en **INICIAR SESIÓN**
4. Serás redirigido a `/portal/dashboard` (necesitas crear esta página)

## Paso 6: Verificar Usuarios en Supabase

1. Ve a **Authentication** → **Users**
2. Verás los usuarios registrados
3. Puedes verificar manualmente los usuarios si es necesario
4. En **Table Editor** → **profiles**, verás los perfiles creados automáticamente

## Funciones Disponibles

El archivo `lib/supabase.ts` incluye las siguientes funciones:

### Autenticación
- `authHelpers.signUp(email, password, userData)` - Registrar usuario
- `authHelpers.signIn(email, password)` - Iniciar sesión
- `authHelpers.signOut()` - Cerrar sesión
- `authHelpers.getCurrentUser()` - Obtener usuario actual
- `authHelpers.resetPassword(email)` - Recuperar contraseña
- `authHelpers.updatePassword(newPassword)` - Actualizar contraseña

### Perfiles
- `authHelpers.getUserProfile(userId)` - Obtener perfil de usuario
- `authHelpers.updateUserProfile(userId, updates)` - Actualizar perfil

## Próximos Pasos

1. **Crear Dashboard**: Crea la página `/portal/dashboard` para usuarios autenticados
2. **Proteger Rutas**: Implementa middleware para proteger rutas que requieren autenticación
3. **Recuperación de Contraseña**: Crea la página `/reset-password` para el flujo de recuperación
4. **Perfil de Usuario**: Permite a los usuarios ver y editar su perfil

## Solución de Problemas

### Error: "No puede inicializar Supabase"
- Verifica que las variables de entorno estén correctamente configuradas
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Invalid login credentials"
- Verifica que el email y contraseña sean correctos
- Si el usuario no ha confirmado su email, verifica en Supabase Dashboard

### Error: "Email already registered"
- El correo ya existe en la base de datos
- Intenta iniciar sesión o usa otro correo

### La tabla profiles no se crea automáticamente
- Verifica que ejecutaste el SQL en el Editor SQL de Supabase
- Revisa los logs en **Logs** → **Postgres Logs**

## Seguridad

⚠️ **Importantes prácticas de seguridad:**

1. **Nunca** expongas `SUPABASE_SERVICE_ROLE_KEY` en el cliente
2. Usa variables de entorno para todas las credenciales
3. Mantén habilitado Row Level Security (RLS)
4. Revisa periódicamente las políticas de acceso
5. Habilita confirmación de email en producción

## Recursos

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Guía de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js con Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
