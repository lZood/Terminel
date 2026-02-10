-- Tabla de perfiles de usuarios del Portal Productor
-- Ejecutar este SQL en el Editor SQL de Supabase

-- 1. Crear la tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  rfc VARCHAR(13) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  empresa VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso
-- Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Los usuarios solo pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Permitir la inserción de perfiles al momento del registro
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 4. Función para crear el perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, rfc, nombre, email, telefono, empresa)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'rfc',
    new.raw_user_meta_data->>'nombre',
    new.email,
    new.raw_user_meta_data->>'telefono',
    new.raw_user_meta_data->>'empresa'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger para ejecutar la función cuando se crea un nuevo usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS profiles_rfc_idx ON profiles(rfc);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);

-- 9. Comentarios para documentación
COMMENT ON TABLE profiles IS 'Perfiles de usuarios del Portal Productor';
COMMENT ON COLUMN profiles.id IS 'ID del usuario (referencia a auth.users)';
COMMENT ON COLUMN profiles.rfc IS 'RFC del productor o empleado';
COMMENT ON COLUMN profiles.nombre IS 'Nombre completo del usuario';
COMMENT ON COLUMN profiles.email IS 'Correo electrónico del usuario';
COMMENT ON COLUMN profiles.telefono IS 'Número de teléfono del usuario';
COMMENT ON COLUMN profiles.empresa IS 'Empresa u organización (opcional)';
