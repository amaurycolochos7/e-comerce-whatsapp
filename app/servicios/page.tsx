import { createClient } from '@/lib/supabase/server';
import Header from '@/components/public/Header';
import Services from '@/components/public/Services';
import Footer from '@/components/public/Footer';
import WhatsAppFloat from '@/components/public/WhatsAppFloat';
import type { Configuracion, Servicio } from '@/lib/types';

export const revalidate = 60;

export default async function ServiciosPage() {
  let config: Configuracion | null = null;
  let servicios: Servicio[] = [];

  try {
    const supabase = await createClient();
    const [configRes, serviciosRes] = await Promise.all([
      supabase.from('configuracion').select('*').limit(1).single(),
      supabase.from('servicios').select('*').eq('activo', true),
    ]);
    config = (configRes.data as Configuracion) || null;
    servicios = (serviciosRes.data as Servicio[]) || [];
  } catch { /* ignore */ }

  const whatsapp = config?.whatsapp_contacto || '';

  return (
    <main>
      <Header config={config} />
      <Services servicios={servicios} whatsapp={whatsapp} config={config} />
      <Footer config={config} />
      <WhatsAppFloat whatsapp={whatsapp} />
    </main>
  );
}
