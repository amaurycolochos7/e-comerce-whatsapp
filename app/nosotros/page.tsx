import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NosotrosPage() {
  return (
    <main>
      <Header config={null} />
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Sobre Nosotros</h1>

          <div className="bg-white rounded p-6 md:p-8 border border-gray-200 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Quienes Somos</h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>Soluciones Tecnologicas &quot;El Inge&quot;</strong> es una empresa dedicada a ofrecer licencias originales de software,
                suscripciones digitales y servicios tecnicos especializados para computadoras y celulares.
                Ubicados en Venustiano Carranza, Chiapas, nos comprometemos a brindar soluciones tecnologicas accesibles y de calidad.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Nuestra Mision</h2>
              <p className="text-gray-600 leading-relaxed">
                Facilitar el acceso a software original y servicios tecnicos de calidad a precios competitivos,
                garantizando la satisfaccion de nuestros clientes con un servicio rapido, seguro y personalizado.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Nuestra Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Ser la empresa lider en soluciones tecnologicas en la region, reconocida por la confiabilidad de nuestros productos,
                la excelencia en el servicio tecnico y la innovacion constante en nuestras ofertas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Nuestros Valores</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Honestidad y transparencia',
                  'Seguridad en cada transaccion',
                  'Rapidez en la entrega',
                  'Compromiso con el cliente',
                  'Innovacion constante',
                  'Garantia de originalidad',
                ].map((v, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100">
                    <span className="text-sm text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer config={null} />
    </main>
  );
}
