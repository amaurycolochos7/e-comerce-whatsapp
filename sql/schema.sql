-- ============================================
-- SOLUCIONES TECNOLÓGICAS "EL INGE"
-- Script completo para Supabase
-- Ejecutar en: SQL Editor de tu proyecto Supabase
-- ============================================

-- 1. CREAR TABLAS
-- ============================================

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  precio_anterior DECIMAL(10,2),
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  imagen_url TEXT,
  destacado BOOLEAN DEFAULT false,
  activo BOOLEAN DEFAULT true,
  compatibilidad TEXT,
  duracion_licencia TEXT,
  que_incluye TEXT,
  forma_entrega TEXT,
  soporte TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de imágenes de productos (galería)
CREATE TABLE IF NOT EXISTS producto_imagenes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  imagen_url TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  imagen_url TEXT,
  categoria_servicio TEXT DEFAULT 'computadoras',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de imágenes de servicios (galería)
CREATE TABLE IF NOT EXISTS servicio_imagenes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  servicio_id UUID NOT NULL REFERENCES servicios(id) ON DELETE CASCADE,
  imagen_url TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de solicitudes de software
CREATE TABLE IF NOT EXISTS solicitudes_software (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  programa TEXT NOT NULL,
  version TEXT,
  sistema_operativo TEXT NOT NULL,
  comentario TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de citas de reparación
CREATE TABLE IF NOT EXISTS citas_reparacion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  tipo_equipo TEXT NOT NULL,
  marca TEXT NOT NULL,
  problema TEXT NOT NULL,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de configuración del sitio
CREATE TABLE IF NOT EXISTS configuracion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Información básica
  nombre_negocio TEXT NOT NULL DEFAULT 'Soluciones Tecnológicas El Inge',
  slogan TEXT DEFAULT 'Licencias originales y servicios técnicos',
  whatsapp_contacto TEXT DEFAULT '',
  telefono TEXT DEFAULT '',
  logo_url TEXT,
  direccion TEXT DEFAULT 'Venustiano Carranza, Chiapas',
  horario JSONB DEFAULT '{"lunes":"9:00 am - 6:00 pm","martes":"9:00 am - 6:00 pm","miercoles":"9:00 am - 6:00 pm","jueves":"9:00 am - 6:00 pm","viernes":"9:00 am - 6:00 pm","sabado":"9:00 am - 2:00 pm","domingo":"Cerrado"}'::jsonb,

  -- Hero
  hero_titulo TEXT DEFAULT 'Licencias Originales al Mejor Precio',
  hero_subtitulo TEXT DEFAULT 'Consigue software original, catálogo completo y servicios técnicos avanzados.',
  hero_imagen_url TEXT,
  hero_imagen_posicion TEXT DEFAULT 'center center',
  hero_boton_texto TEXT DEFAULT 'Ver Catálogo',
  hero_boton_secundario_texto TEXT DEFAULT 'WhatsApp',

  -- Estadísticas del Hero
  stats JSONB DEFAULT '[{"valor":"50+","etiqueta":"Productos"},{"valor":"500+","etiqueta":"Clientes felices"},{"valor":"24/7","etiqueta":"WhatsApp"}]'::jsonb,

  -- Colores
  color_primario TEXT DEFAULT '#0a1628',
  color_secundario TEXT DEFAULT '#4da8da',
  color_acento TEXT DEFAULT '#4da8da',
  color_fondo TEXT DEFAULT '#ffffff',
  color_texto TEXT DEFAULT '#1a202c',

  -- Textos de secciones
  texto_categorias_titulo TEXT DEFAULT 'Explora Nuestras Categorías',
  texto_categorias_subtitulo TEXT DEFAULT 'Encuentra la licencia o servicio que necesitas',
  texto_catalogo_titulo TEXT DEFAULT 'Productos Catálogo',
  texto_catalogo_subtitulo TEXT DEFAULT 'Los mejores productos seleccionados para ti',
  texto_servicios_titulo TEXT DEFAULT 'Nuestros Servicios Técnicos',
  texto_servicios_subtitulo TEXT DEFAULT 'Soluciones profesionales para tu equipo',
  texto_contacto_titulo TEXT DEFAULT 'Contáctanos',
  texto_contacto_subtitulo TEXT DEFAULT 'Estamos aquí para atenderte',

  -- Footer
  texto_footer TEXT DEFAULT 'Licencias originales de software y servicios técnicos de confianza.',

  -- Redes sociales
  redes_sociales JSONB DEFAULT '{"facebook":"","instagram":"","tiktok":""}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT now()
);


-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto_imagenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicio_imagenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes_software ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas_reparacion ENABLE ROW LEVEL SECURITY;


-- 3. POLÍTICAS DE ACCESO PÚBLICO (lectura para todos)
-- ============================================

CREATE POLICY "Lectura pública de categorías" ON categorias FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Lectura pública de productos" ON productos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Lectura pública de servicios" ON servicios FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Lectura pública de configuración" ON configuracion FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Lectura pública de imágenes productos" ON producto_imagenes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Lectura pública de imágenes servicios" ON servicio_imagenes FOR SELECT TO anon, authenticated USING (true);


-- 4. POLÍTICAS DE ESCRITURA (solo administradores autenticados)
-- ============================================

-- Categorías
CREATE POLICY "Admin insertar categorías" ON categorias FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar categorías" ON categorias FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar categorías" ON categorias FOR DELETE TO authenticated USING (true);

-- Productos
CREATE POLICY "Admin insertar productos" ON productos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar productos" ON productos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar productos" ON productos FOR DELETE TO authenticated USING (true);

-- Servicios
CREATE POLICY "Admin insertar servicios" ON servicios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar servicios" ON servicios FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar servicios" ON servicios FOR DELETE TO authenticated USING (true);

-- Imágenes productos
CREATE POLICY "Admin insertar imágenes productos" ON producto_imagenes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar imágenes productos" ON producto_imagenes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar imágenes productos" ON producto_imagenes FOR DELETE TO authenticated USING (true);

-- Imágenes servicios
CREATE POLICY "Admin insertar imágenes servicios" ON servicio_imagenes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar imágenes servicios" ON servicio_imagenes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar imágenes servicios" ON servicio_imagenes FOR DELETE TO authenticated USING (true);

-- Configuración
CREATE POLICY "Admin insertar configuración" ON configuracion FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin actualizar configuración" ON configuracion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin eliminar configuración" ON configuracion FOR DELETE TO authenticated USING (true);

-- Solicitudes de software (público puede insertar, admin puede leer/eliminar)
CREATE POLICY "Público insertar solicitudes" ON solicitudes_software FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin leer solicitudes" ON solicitudes_software FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin eliminar solicitudes" ON solicitudes_software FOR DELETE TO authenticated USING (true);

-- Citas de reparación (público puede insertar, admin puede leer/eliminar)
CREATE POLICY "Público insertar citas" ON citas_reparacion FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin leer citas" ON citas_reparacion FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin eliminar citas" ON citas_reparacion FOR DELETE TO authenticated USING (true);


-- 5. CREAR BUCKETS DE STORAGE (para imágenes)
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('productos', 'productos', true),
  ('servicios', 'servicios', true),
  ('configuracion', 'configuracion', true),
  ('categorias', 'categorias', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imágenes públicas lectura"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('productos', 'servicios', 'configuracion', 'categorias'));

CREATE POLICY "Admin subir imágenes"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('productos', 'servicios', 'configuracion', 'categorias'));

CREATE POLICY "Admin actualizar imágenes"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('productos', 'servicios', 'configuracion', 'categorias'));

CREATE POLICY "Admin eliminar imágenes"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('productos', 'servicios', 'configuracion', 'categorias'));


-- 6. DATOS DE EJEMPLO (SEED DATA)
-- ============================================

-- Configuración inicial
INSERT INTO configuracion (
  nombre_negocio, slogan, whatsapp_contacto, telefono, direccion,
  hero_titulo, hero_subtitulo,
  hero_boton_texto, hero_boton_secundario_texto,
  color_primario, color_secundario, color_acento, color_fondo, color_texto
) VALUES (
  'Soluciones Tecnológicas El Inge',
  'Licencias originales y servicios técnicos',
  '5219611234567',
  '+52 961 123 4567',
  'Venustiano Carranza, Chiapas',
  'Licencias Originales al Mejor Precio',
  'Consigue software original, catálogo completo y servicios técnicos avanzados.',
  'Ver Catálogo',
  'WhatsApp',
  '#0a1628',
  '#4da8da',
  '#4da8da',
  '#ffffff',
  '#1a202c'
);

-- Categorías
INSERT INTO categorias (nombre, descripcion, orden) VALUES
  ('Office', 'Suite de oficina Microsoft Office', 1),
  ('Software profesional', 'Herramientas profesionales de diseño y gestión', 2),
  ('Sistemas operativos', 'Windows y sistemas operativos', 3),
  ('Antivirus', 'Protección y seguridad para tu equipo', 4),
  ('Streaming y herramientas digitales', 'Suscripciones y herramientas en línea', 5),
  ('Servicios técnicos', 'Reparación y mantenimiento de equipos', 6),
  ('Ofertas', 'Productos en descuento', 7);

-- Productos - Office
INSERT INTO productos (nombre, descripcion, precio, precio_anterior, categoria_id, destacado, activo, compatibilidad, duracion_licencia, que_incluye, forma_entrega, soporte) VALUES
  ('Office 2021 Professional', 'Suite completa de Office con Word, Excel, PowerPoint, Outlook y más.', 129.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Office'), true, true, 'Windows 10/11', 'De por vida', 'Clave de activación\nGuía de instalación\nSoporte técnico', 'Digital por WhatsApp', 'Soporte por WhatsApp 24/7'),
  ('Office 365', 'Suscripción anual con todas las aplicaciones de Office y 1TB en OneDrive.', 99.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Office'), true, true, 'Windows, Mac, iOS, Android', '1 año', 'Cuenta activa\n1TB OneDrive\nActualizaciones automáticas', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Office 2024 Professional', 'La versión más reciente de Microsoft Office con todas las novedades.', 199.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Office'), true, true, 'Windows 11', 'De por vida', 'Clave de activación\nInstalación remota incluida', 'Digital por WhatsApp', 'Soporte por WhatsApp');

-- Productos - Software profesional
INSERT INTO productos (nombre, descripcion, precio, precio_anterior, categoria_id, destacado, activo, compatibilidad, duracion_licencia, que_incluye, forma_entrega, soporte) VALUES
  ('Microsoft Project', 'Gestión profesional de proyectos con herramientas avanzadas de planificación.', 149.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Software profesional'), false, true, 'Windows 10/11', 'De por vida', 'Clave de activación\nGuía de uso', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Microsoft Visio', 'Crea diagramas profesionales y flujos de trabajo.', 149.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Software profesional'), false, true, 'Windows 10/11', 'De por vida', 'Clave de activación', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('AutoCAD', 'Software de diseño asistido por computadora para arquitectura e ingeniería.', 250.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Software profesional'), true, true, 'Windows 10/11', '1 año', 'Cuenta activada\nActualizaciones', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('CorelDraw', 'Suite de diseño gráfico profesional.', 180.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Software profesional'), false, true, 'Windows 10/11', 'De por vida', 'Instalación completa\nActivación', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Suite Autodesk', 'Paquete completo de herramientas Autodesk para diseño y modelado.', 300.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Software profesional'), false, true, 'Windows 10/11', '1 año', 'Cuenta Autodesk\nAcceso a todas las herramientas', 'Digital por WhatsApp', 'Soporte por WhatsApp');

-- Productos - Sistemas operativos
INSERT INTO productos (nombre, descripcion, precio, precio_anterior, categoria_id, destacado, activo, compatibilidad, duracion_licencia, que_incluye, forma_entrega, soporte) VALUES
  ('Windows 11 Pro', 'El sistema operativo más moderno con todas las funciones profesionales.', 190.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Sistemas operativos'), true, true, 'PC compatible', 'De por vida', 'Clave de activación\nISO de instalación\nGuía paso a paso', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Windows 10 Pro', 'Sistema operativo confiable y estable para trabajo profesional.', 150.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Sistemas operativos'), true, true, 'PC compatible', 'De por vida', 'Clave de activación\nISO de instalación', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Windows 8.1 Pro', 'Sistema operativo para equipos más antiguos.', 99.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Sistemas operativos'), false, true, 'PC compatible', 'De por vida', 'Clave de activación', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Windows Server 2022', 'Sistema operativo para servidores empresariales.', 350.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Sistemas operativos'), false, true, 'Servidor', 'De por vida', 'Clave de activación\nAsistencia en instalación', 'Digital por WhatsApp', 'Soporte por WhatsApp');

-- Productos - Antivirus
INSERT INTO productos (nombre, descripcion, precio, precio_anterior, categoria_id, destacado, activo, compatibilidad, duracion_licencia, que_incluye, forma_entrega, soporte) VALUES
  ('Avast Premium', 'Protección completa contra virus, malware y amenazas en línea.', 89.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Antivirus'), false, true, 'Windows, Mac', '1 año', 'Clave de activación\nProtección completa', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Kaspersky Standard', 'Antivirus esencial con protección en tiempo real.', 79.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Antivirus'), false, true, 'Windows, Mac, Android', '1 año', 'Licencia digital\nProtección básica', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Kaspersky Premium', 'La mejor protección con VPN ilimitado y gestor de contraseñas.', 148.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Antivirus'), true, true, 'Windows, Mac, iOS, Android', '1 año', 'Licencia premium\nVPN ilimitado\nGestor de contraseñas', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('ESET NOD32', 'Antivirus ligero y eficiente con máxima protección.', 69.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Antivirus'), false, true, 'Windows', '1 año', 'Licencia digital\nActualizaciones automáticas', 'Digital por WhatsApp', 'Soporte por WhatsApp');

-- Productos - Streaming
INSERT INTO productos (nombre, descripcion, precio, precio_anterior, categoria_id, destacado, activo, compatibilidad, duracion_licencia, que_incluye, forma_entrega, soporte) VALUES
  ('Spotify Premium', 'Música sin anuncios, descarga offline y calidad máxima.', 35.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Streaming y herramientas digitales'), false, true, 'Todos los dispositivos', '1 mes', 'Cuenta activa\nMúsica sin anuncios', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('YouTube Premium', 'YouTube sin anuncios, reproducción en segundo plano y YouTube Music.', 40.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Streaming y herramientas digitales'), false, true, 'Todos los dispositivos', '1 mes', 'Cuenta activa\nSin publicidad', 'Digital por WhatsApp', 'Soporte por WhatsApp'),
  ('Canva Pro', 'Herramienta de diseño con miles de plantillas y recursos premium.', 45.00, NULL, (SELECT id FROM categorias WHERE nombre = 'Streaming y herramientas digitales'), false, true, 'Web, iOS, Android', '1 mes', 'Cuenta activa\nRecursos premium', 'Digital por WhatsApp', 'Soporte por WhatsApp');

-- Servicios para computadoras
INSERT INTO servicios (nombre, descripcion, precio, categoria_servicio, activo) VALUES
  ('Formateo de sistema operativo', 'Reinstalación limpia del sistema operativo con todos los drivers.', 250.00, 'computadoras', true),
  ('Instalación de programas', 'Instalación y configuración de software profesional.', 100.00, 'computadoras', true),
  ('Activación de licencias', 'Activación segura de licencias de software.', 50.00, 'computadoras', true),
  ('Eliminación de virus', 'Escaneo completo y eliminación de malware y virus.', 200.00, 'computadoras', true),
  ('Optimización del sistema', 'Limpieza y optimización para mejorar el rendimiento.', 150.00, 'computadoras', true),
  ('Mejora de rendimiento', 'Diagnóstico y mejora del rendimiento general del equipo.', 200.00, 'computadoras', true);

-- Mantenimiento de computadoras
INSERT INTO servicios (nombre, descripcion, precio, categoria_servicio, activo) VALUES
  ('Limpieza interna', 'Limpieza profunda de polvo y residuos del equipo.', 200.00, 'mantenimiento', true),
  ('Cambio de pasta térmica', 'Reemplazo de pasta térmica para mejor refrigeración.', 150.00, 'mantenimiento', true),
  ('Diagnóstico de fallas', 'Diagnóstico profesional para detectar fallas de hardware o software.', 100.00, 'mantenimiento', true),
  ('Instalación de SSD', 'Instalación de disco de estado sólido y migración de datos.', 300.00, 'mantenimiento', true),
  ('Ampliación de memoria RAM', 'Instalación de módulos adicionales de memoria.', 200.00, 'mantenimiento', true),
  ('Mantenimiento preventivo', 'Servicio completo de limpieza, actualización y optimización.', 350.00, 'mantenimiento', true);

-- Servicios para celulares
INSERT INTO servicios (nombre, descripcion, precio, categoria_servicio, activo) VALUES
  ('Liberación de celulares', 'Liberación de equipo para usar con cualquier compañía.', 200.00, 'celulares', true),
  ('Eliminación de cuentas', 'Eliminación segura de cuentas Google o iCloud.', 300.00, 'celulares', true),
  ('Instalación de software', 'Instalación de aplicaciones y software en celulares.', 100.00, 'celulares', true),
  ('Optimización del sistema', 'Limpieza y optimización del sistema móvil.', 100.00, 'celulares', true),
  ('Eliminación de virus', 'Eliminación de malware y virus del celular.', 150.00, 'celulares', true),
  ('Configuración inicial', 'Configuración completa del celular nuevo o formateado.', 100.00, 'celulares', true);


-- ============================================
-- ¡LISTO! PASOS SIGUIENTES:
-- 1. Crea un usuario en Authentication > Users en Supabase
-- 2. Configura las variables de entorno en Vercel:
--    NEXT_PUBLIC_SUPABASE_URL
--    NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 3. Sube el logo desde el panel de administración
-- ============================================
