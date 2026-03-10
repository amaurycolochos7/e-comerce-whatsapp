import { createClient } from '@/lib/supabase/server';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppFloat from '@/components/public/WhatsAppFloat';
import ProductDetail from '@/components/public/ProductDetail';
import type { Configuracion, Producto } from '@/lib/types';

export const revalidate = 60;

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let config: Configuracion | null = null;
  let producto: Producto | null = null;

  try {
    const supabase = await createClient();
    const [configRes, prodRes] = await Promise.all([
      supabase.from('configuracion').select('*').limit(1).single(),
      supabase.from('productos').select('*, categorias(nombre)').eq('id', id).single(),
    ]);
    config = (configRes.data as Configuracion) || null;
    producto = (prodRes.data as Producto) || null;
  } catch { /* ignore */ }

  const whatsapp = config?.whatsapp_contacto || '';

  return (
    <main>
      <Header config={config} />
      {producto ? (
        <ProductDetail producto={producto} whatsapp={whatsapp} config={config} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-400 text-lg">Producto no encontrado</p>
        </div>
      )}
      <Footer config={config} />
      <WhatsAppFloat whatsapp={whatsapp} />
    </main>
  );
}
