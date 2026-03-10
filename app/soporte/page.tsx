import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function SoportePage() {
  return (
    <main>
      <Header config={null} />
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">Soporte Tecnico</h1>
          <p className="text-gray-400 text-center mb-10">Necesitas ayuda? Estamos para servirte</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-800 mb-2">Soporte por WhatsApp</h3>
              <p className="text-sm text-gray-500 mb-4">Escribenos directamente y te ayudaremos con cualquier problema de instalacion o activacion.</p>
              <a href="#" className="text-sm font-medium text-[#25d366] hover:underline">Contactar por WhatsApp</a>
            </div>

            <div className="bg-white rounded p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-800 mb-2">Soporte Remoto</h3>
              <p className="text-sm text-gray-500 mb-4">Podemos conectarnos a tu equipo de forma remota para resolver problemas de software.</p>
              <a href="/citas" className="text-sm font-medium text-[#2980b9] hover:underline">Programar sesion</a>
            </div>

            <div className="bg-white rounded p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-800 mb-2">Guias de Instalacion</h3>
              <p className="text-sm text-gray-500 mb-4">Te enviamos guias paso a paso para la instalacion y activacion de tu software.</p>
              <a href="/faq" className="text-sm font-medium text-[#2980b9] hover:underline">Ver FAQ</a>
            </div>

            <div className="bg-white rounded p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-800 mb-2">Reparacion Presencial</h3>
              <p className="text-sm text-gray-500 mb-4">Agenda una cita para llevar tu equipo a nuestro local y lo reparamos.</p>
              <a href="/citas" className="text-sm font-medium text-[#2980b9] hover:underline">Agendar cita</a>
            </div>
          </div>
        </div>
      </section>
      <Footer config={null} />
    </main>
  );
}
