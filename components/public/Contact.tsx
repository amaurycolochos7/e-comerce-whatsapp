import type { Configuracion } from '@/lib/types';

interface Props {
  config: Configuracion | null;
}

export default function Contact({ config }: Props) {
  const direccion = config?.direccion || 'Venustiano Carranza, Chiapas';
  const telefono = config?.telefono || '';
  const whatsapp = config?.whatsapp_contacto || '';
  const horario = config?.horario || {};

  return (
    <section id="contacto" className="py-10 md:py-14 bg-[#f8f9fa] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contactanos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="bg-white rounded border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Direccion</h3>
            <p className="text-sm text-gray-500">{direccion}</p>
          </div>

          <div className="bg-white rounded border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">WhatsApp</h3>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#25d366] hover:underline">
                Enviar mensaje
              </a>
            )}
            {telefono && <p className="text-sm text-gray-500 mt-1">{telefono}</p>}
          </div>

          <div className="bg-white rounded border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Horario</h3>
            <div className="text-xs text-gray-500 space-y-0.5">
              {Object.entries(horario).length > 0 ? (
                Object.entries(horario).map(([dia, hora]) => (
                  <div key={dia} className="flex justify-between">
                    <span className="capitalize">{dia}:</span>
                    <span>{hora}</span>
                  </div>
                ))
              ) : (
                <p>Lun-Vie: 9:00 am - 6:00 pm</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
