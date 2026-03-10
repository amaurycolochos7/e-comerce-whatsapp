import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function FAQPage() {
  const preguntas = [
    { q: '¿Las licencias son originales?', a: 'Sí, todas nuestras licencias son 100% originales y legítimas. Trabajamos directamente con proveedores autorizados para garantizar la autenticidad de cada producto.' },
    { q: '¿Cómo recibo mi licencia?', a: 'Las licencias se entregan de forma digital. Recibirás tu clave de activación y las instrucciones de instalación directamente por WhatsApp o correo electrónico en cuestión de minutos.' },
    { q: '¿En cuánto tiempo se entrega?', a: 'La mayoría de las licencias de software se entregan en menos de 30 minutos después de confirmar el pago. Para servicios técnicos, el tiempo depende del tipo de servicio solicitado.' },
    { q: '¿Ofrecen soporte técnico?', a: 'Sí, ofrecemos soporte técnico completo. Te ayudamos con la instalación, activación y cualquier problema que puedas tener con nuestros productos.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Actualmente manejamos los pagos directamente por WhatsApp. Aceptamos transferencias bancarias y otros métodos de pago que se coordinarán al momento de tu compra.' },
    { q: '¿Las licencias son de por vida?', a: 'Depende del producto. Algunas licencias como Office 2021 y Windows son de por vida (una sola compra), mientras que otras como Office 365 o Spotify son suscripciones mensuales o anuales.' },
    { q: '¿Hacen reparaciones a domicilio?', a: 'Sí, ofrecemos servicios técnicos que incluyen visitas a domicilio. Programa una cita a través de nuestro formulario o contáctanos por WhatsApp para más detalles.' },
    { q: '¿Tienen garantía en sus servicios?', a: 'Sí, todos nuestros servicios técnicos incluyen garantía. Si el problema persiste después de la reparación, lo resolveremos sin costo adicional.' },
  ];

  return (
    <main>
      <Header config={null} />
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-3 text-center">Preguntas Frecuentes</h1>
          <p className="text-gray-400 text-center mb-10">Encuentra respuestas a las dudas más comunes</p>

          <div className="space-y-3">
            {preguntas.map((p, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-[#0a1628] text-sm pr-4">{p.q}</span>
                  <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {p.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer config={null} />
    </main>
  );
}
