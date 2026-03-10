-- Migración: Reemplazar hero_badge por hero_imagen_posicion
-- Ejecutar en: SQL Editor de Supabase

-- Agregar columna de posición de imagen
ALTER TABLE configuracion ADD COLUMN IF NOT EXISTS hero_imagen_posicion TEXT DEFAULT 'center center';

-- Eliminar columna de badge (ya no se usa)
ALTER TABLE configuracion DROP COLUMN IF EXISTS hero_badge;
