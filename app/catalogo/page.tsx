import { createClient } from '@/lib/supabase/server';
import Header from '@/components/public/Header';
import ProductCatalog from '@/components/public/ProductCatalog';
import Footer from '@/components/public/Footer';
import WhatsAppFloat from '@/components/public/WhatsAppFloat';
import type { Configuracion, Categoria, Producto } from '@/lib/types';

export const revalidate = 60;

export default async function CatalogoPage() {
  let config: Configuracion | null = null;
  let categorias: Categoria[] = [];
  let productos: Producto[] = [];

  try {
    const supabase = await createClient();
    const [configRes, categoriasRes, productosRes] = await Promise.all([
      supabase.from('configuracion').select('*').limit(1).single(),
      supabase.from('categorias').select('*').order('orden', { ascending: true }),
      supabase.from('productos').select('*, categorias(nombre)').eq('activo', true).order('created_at', { ascending: false }),
    ]);
    config = (configRes.data as Configuracion) || null;
    categorias = (categoriasRes.data as Categoria[]) || [];
    productos = (productosRes.data as Producto[]) || [];
  } catch { /* ignore */ }

  const whatsapp = config?.whatsapp_contacto || '';

  return (
    <main>
      <Header config={config} />
      <ProductCatalog productos={productos} categorias={categorias} whatsapp={whatsapp} config={config} />
      <Footer config={config} />
      <WhatsAppFloat whatsapp={whatsapp} />
    </main>
  );
}
