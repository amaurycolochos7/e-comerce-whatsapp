import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  let totalProductos = 0;
  let totalCategorias = 0;
  let totalServicios = 0;
  let totalSolicitudes = 0;
  let totalCitas = 0;

  try {
    const supabase = await createClient();
    const [productosRes, categoriasRes, serviciosRes, solicitudesRes, citasRes] = await Promise.all([
      supabase.from('productos').select('id', { count: 'exact' }),
      supabase.from('categorias').select('id', { count: 'exact' }),
      supabase.from('servicios').select('id', { count: 'exact' }),
      supabase.from('solicitudes_software').select('id', { count: 'exact' }),
      supabase.from('citas_reparacion').select('id', { count: 'exact' }),
    ]);
    totalProductos = productosRes.count || 0;
    totalCategorias = categoriasRes.count || 0;
    totalServicios = serviciosRes.count || 0;
    totalSolicitudes = solicitudesRes.count || 0;
    totalCitas = citasRes.count || 0;
  } catch { /* Supabase no conectado */ }

  const stats = [
    { label: 'Productos', valor: totalProductos, bgLight: 'bg-blue-50', href: '/admin/productos', icon: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { label: 'Categorías', valor: totalCategorias, bgLight: 'bg-amber-50', href: '/admin/categorias', icon: <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg> },
    { label: 'Servicios', valor: totalServicios, bgLight: 'bg-green-50', href: '/admin/servicios', icon: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { label: 'Solicitudes', valor: totalSolicitudes, bgLight: 'bg-purple-50', href: '/admin/solicitudes', icon: <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { label: 'Citas', valor: totalCitas, bgLight: 'bg-pink-50', href: '/admin/citas', icon: <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Bienvenido, Administrador</h2>
        <p className="text-gray-500">Resumen general de tu negocio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-[#4da8da]/30 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl ${stat.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform`}>{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.valor}</p>
                <p className="text-xs text-gray-500 group-hover:text-[#4da8da] transition-colors">{stat.label}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: '/admin/productos', label: 'Gestionar Productos', desc: 'Agregar, editar o eliminar' },
            { href: '/admin/categorias', label: 'Gestionar Categorías', desc: 'Organizar productos' },
            { href: '/admin/servicios', label: 'Gestionar Servicios', desc: 'Administrar servicios técnicos' },
            { href: '/admin/configuracion', label: 'Configuración', desc: 'Logo, colores y datos' },
          ].map((action) => (
            <a key={action.href} href={action.href} className="p-4 rounded-xl border border-gray-200 hover:border-[#4da8da]/30 hover:bg-blue-50/50 transition-all group">
              <p className="font-medium text-gray-800 group-hover:text-[#4da8da] text-sm">{action.label}</p>
              <p className="text-xs text-gray-400 mt-1">{action.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
