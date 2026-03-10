import type { Configuracion } from '@/lib/types';

interface Props {
  config: Configuracion | null;
}

export default function Hero({ config }: Props) {
  const titulo = config?.hero_titulo || 'Licencias Originales al Mejor Precio';
  const subtitulo = config?.hero_subtitulo || 'Consigue software original, catálogo completo y servicios avanzados.';
  const badge = config?.hero_badge || '';
  const botonTexto = config?.hero_boton_texto || 'Ver Catálogo';
  const botonSecundario = config?.hero_boton_secundario_texto || 'WhatsApp';
  const heroImagen = config?.hero_imagen_url;
  const whatsapp = config?.whatsapp_contacto || '';

  return (
    <section className="bg-gradient-to-r from-[#1a4a72] to-[#2980b9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Imagen lado izquierdo */}
          <div className="w-full md:w-1/2 flex justify-center">
            {heroImagen ? (
              <img src={heroImagen} alt="Productos destacados" className="max-h-72 object-contain drop-shadow-2xl" />
            ) : (
              <div className="relative w-72 h-56 flex items-center justify-center">
                {/* Simulación de cajas de producto */}
                <div className="absolute left-0 bottom-0 w-36 h-44 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform -rotate-6 shadow-xl flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <svg className="w-10 h-10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span className="text-xs">Windows 11</span>
                  </div>
                </div>
                <div className="absolute right-0 bottom-4 w-36 h-44 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform rotate-3 shadow-xl flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <svg className="w-10 h-10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-xs">Office 2021</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Texto lado derecho */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            {badge && (
              <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3">{badge}</span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {titulo}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-lg">
              {subtitulo}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="/catalogo" className="px-6 py-2.5 bg-[#27ae60] hover:bg-[#219a52] text-white font-semibold rounded text-sm transition-colors shadow-md">
                {botonTexto}
              </a>
              <a
                href={whatsapp ? `https://wa.me/${whatsapp}` : '#'}
                target={whatsapp ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#25d366] hover:bg-[#20bd5a] text-white font-semibold rounded text-sm transition-colors shadow-md"
              >
                {botonSecundario}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
