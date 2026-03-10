export default function Benefits() {
  const beneficios = [
    { titulo: 'Licencias Originales', desc: 'Software 100% genuino' },
    { titulo: 'Activacion Segura', desc: 'Proceso seguro y sin riesgos' },
    { titulo: 'Soporte Tecnico', desc: 'Asistencia para cualquier problema' },
    { titulo: 'Entrega Rapida', desc: 'Recibe tu licencia en minutos' },
    { titulo: 'Instalacion', desc: 'Te ayudamos a instalar' },
    { titulo: 'Mejores Precios', desc: 'Precios competitivos' },
  ];

  return (
    <section className="py-10 bg-[#f8f9fa] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {beneficios.map((b, i) => (
            <div key={i} className="text-center p-4 bg-white rounded border border-gray-200 hover:border-[#2980b9] transition-colors">
              <h3 className="font-semibold text-gray-800 text-xs mb-0.5">{b.titulo}</h3>
              <p className="text-gray-400 text-[11px]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
