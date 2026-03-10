import type { Servicio, Configuracion } from '@/lib/types';

interface Props {
  servicios: Servicio[];
  whatsapp: string;
  config: Configuracion | null;
}

export default function Services({ servicios, whatsapp, config }: Props) {
  const titulo = config?.texto_servicios_titulo || 'Nuestros Servicios Tecnicos';

  const grupos: Record<string, Servicio[]> = {};
  servicios.forEach((s) => {
    const cat = s.categoria_servicio || 'general';
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(s);
  });

  const categoriaTitulos: Record<string, string> = {
    computadoras: 'Servicios para Computadoras',
    mantenimiento: 'Mantenimiento de Computadoras',
    celulares: 'Servicios para Celulares',
    general: 'Servicios Generales',
  };

  return (
    <section id="servicios" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{titulo}</h2>

        <div className="space-y-10">
          {Object.entries(grupos).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b-2 border-[#2980b9]">
                {categoriaTitulos[cat] || cat}
              </h3>

              {/* Grid de cards - responsivo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((servicio) => (
                  <div key={servicio.id} className="bg-gray-50 border border-gray-200 rounded p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{servicio.nombre}</h4>
                      {servicio.descripcion && (
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{servicio.descripcion}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
                      <span className="font-bold text-gray-900 text-base">${servicio.precio.toFixed(2)}</span>
                      <a
                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola, me interesa el servicio: ${servicio.nombre}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white bg-[#25d366] hover:bg-[#20bd5a] px-3 py-1.5 rounded transition-colors"
                      >
                        Solicitar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/citas"
            className="inline-block px-6 py-2.5 bg-[#2980b9] text-white font-semibold rounded text-sm hover:bg-[#2471a3] transition-colors"
          >
            Programar Cita de Reparacion
          </a>
        </div>
      </div>
    </section>
  );
}
