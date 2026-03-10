'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Configuracion } from '@/lib/types';

type Tab = 'general' | 'hero' | 'colores' | 'textos' | 'redes' | 'horario';

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#2980b9] transition-all text-sm"
      />
    </div>
  );
}

function MobilePreview({ config }: { config: Record<string, string> }) {
  return (
    <div className="w-full h-full overflow-y-auto text-[10px] leading-tight" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Top bar */}
      <div className="py-0.5 text-center text-white font-medium bg-[#2980b9]" style={{ fontSize: '6px' }}>
        Bienvenido a {config.nombre_negocio || 'Mi Negocio'}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          {config.logo_url ? (
            <img src={config.logo_url} alt="" className="w-4 h-4 rounded-full object-cover" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-[#2980b9] flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[2px]">
          <div className="w-3 h-[1.5px] bg-gray-400 rounded-full" />
          <div className="w-3 h-[1.5px] bg-gray-400 rounded-full" />
          <div className="w-3 h-[1.5px] bg-gray-400 rounded-full" />
        </div>
      </div>

      {/* Hero */}
      <div className="px-3 py-4 bg-gradient-to-r from-[#1a4a72] to-[#2980b9]">
        {config.hero_imagen_url && (
          <div className="flex justify-center mb-2">
            <img src={config.hero_imagen_url} alt="" className="w-full rounded-lg object-cover" style={{ maxHeight: '80px' }} />
          </div>
        )}
        {config.hero_badge && (
          <div className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20 mb-1">
            <span className="text-white" style={{ fontSize: '6px' }}>{config.hero_badge}</span>
          </div>
        )}
        <h2 className="font-extrabold text-white leading-tight mb-1" style={{ fontSize: '12px' }}>
          {config.hero_titulo || 'Titulo principal'}
        </h2>
        <p className="text-white/70 mb-2" style={{ fontSize: '6px' }}>{config.hero_subtitulo || 'Subtitulo'}</p>
        <div className="flex gap-1">
          <span className="px-2 py-0.5 rounded bg-[#27ae60] text-white font-semibold" style={{ fontSize: '5px' }}>
            {config.hero_boton_texto || 'Ver Catalogo'}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#25d366] text-white font-semibold" style={{ fontSize: '5px' }}>
            {config.hero_boton_secundario_texto || 'WhatsApp'}
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="px-3 py-2 bg-gray-50">
        <h3 className="font-bold text-center mb-1" style={{ fontSize: '8px', color: '#333' }}>
          {config.texto_categorias_titulo || 'Categorias'}
        </h3>
        <div className="grid grid-cols-3 gap-1">
          {['Cat 1', 'Cat 2', 'Cat 3'].map((c, i) => (
            <div key={i} className="bg-white rounded p-1 text-center border border-gray-100">
              <span style={{ fontSize: '5px' }} className="text-gray-500">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-3 py-2 bg-white">
        <h3 className="font-bold text-center mb-1" style={{ fontSize: '8px', color: '#333' }}>
          {config.texto_catalogo_titulo || 'Catalogo'}
        </h3>
        <div className="grid grid-cols-2 gap-1">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-50 rounded border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-100" />
              <div className="p-1">
                <p className="font-medium text-gray-700" style={{ fontSize: '5px' }}>Producto {i}</p>
                <p className="font-bold text-[#2980b9]" style={{ fontSize: '6px' }}>$99.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="px-3 py-2 bg-gray-50">
        <h3 className="font-bold text-center mb-1" style={{ fontSize: '8px', color: '#333' }}>
          {config.texto_servicios_titulo || 'Servicios'}
        </h3>
        <div className="bg-white rounded p-1.5 border border-gray-100">
          <p className="font-medium" style={{ fontSize: '5px', color: '#333' }}>Servicio ejemplo</p>
          <p className="text-gray-400" style={{ fontSize: '4px' }}>Descripcion del servicio</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-[#1a365d] text-white">
        <p className="font-bold" style={{ fontSize: '7px' }}>{config.nombre_negocio || 'Mi Negocio'}</p>
        <p className="text-white/50" style={{ fontSize: '4px' }}>{config.texto_footer || 'Texto del footer'}</p>
        <p className="text-white/30 mt-1" style={{ fontSize: '3px' }}>2026 {config.nombre_negocio}</p>
      </div>
    </div>
  );
}

export default function AdminConfiguracion() {
  const [tab, setTab] = useState<Tab>('general');
  const [config, setConfig] = useState<Configuracion | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [horario, setHorario] = useState<Record<string, string>>({});
  const [redes, setRedes] = useState({ facebook: '', instagram: '', tiktok: '' });
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [subiendoLogo, setSubiendoLogo] = useState(false);
  const [subiendoHero, setSubiendoHero] = useState(false);

  const supabase = createClient();

  const cargar = async () => {
    try {
      const { data } = await supabase.from('configuracion').select('*').limit(1).single();
      if (data) {
        setConfig(data as Configuracion);
        setForm({
          nombre_negocio: data.nombre_negocio || '',
          slogan: data.slogan || '',
          whatsapp_contacto: data.whatsapp_contacto || '',
          telefono: data.telefono || '',
          direccion: data.direccion || '',
          logo_url: data.logo_url || '',
          hero_titulo: data.hero_titulo || '',
          hero_subtitulo: data.hero_subtitulo || '',
          hero_imagen_url: data.hero_imagen_url || '',
          hero_badge: data.hero_badge || '',
          hero_boton_texto: data.hero_boton_texto || '',
          hero_boton_secundario_texto: data.hero_boton_secundario_texto || '',
          color_primario: data.color_primario || '#0a1628',
          color_secundario: data.color_secundario || '#4da8da',
          color_acento: data.color_acento || '#2980b9',
          color_fondo: data.color_fondo || '#ffffff',
          color_texto: data.color_texto || '#1a202c',
          texto_categorias_titulo: data.texto_categorias_titulo || '',
          texto_categorias_subtitulo: data.texto_categorias_subtitulo || '',
          texto_catalogo_titulo: data.texto_catalogo_titulo || '',
          texto_catalogo_subtitulo: data.texto_catalogo_subtitulo || '',
          texto_servicios_titulo: data.texto_servicios_titulo || '',
          texto_servicios_subtitulo: data.texto_servicios_subtitulo || '',
          texto_contacto_titulo: data.texto_contacto_titulo || '',
          texto_contacto_subtitulo: data.texto_contacto_subtitulo || '',
          texto_footer: data.texto_footer || '',
        });
        setRedes(data.redes_sociales || { facebook: '', instagram: '', tiktok: '' });
        setHorario(data.horario || {
          lunes: '9:00 am - 6:00 pm', martes: '9:00 am - 6:00 pm',
          miercoles: '9:00 am - 6:00 pm', jueves: '9:00 am - 6:00 pm',
          viernes: '9:00 am - 6:00 pm', sabado: '9:00 am - 2:00 pm',
          domingo: 'Cerrado',
        });
      }
    } catch { /* sin datos */ }
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

  const subirImagen = async (file: File, tipo: 'logo' | 'hero') => {
    const setSubiendo = tipo === 'logo' ? setSubiendoLogo : setSubiendoHero;
    setSubiendo(true);
    const ext = file.name.split('.').pop();
    const nombre = `${tipo}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('configuracion').upload(nombre, file, { upsert: true });
    if (error) {
      setMensaje(`Error subiendo imagen: ${error.message}`);
      setSubiendo(false);
      return;
    }
    const { data } = supabase.storage.from('configuracion').getPublicUrl(nombre);
    const key = tipo === 'logo' ? 'logo_url' : 'hero_imagen_url';
    setForm(prev => ({ ...prev, [key]: data.publicUrl }));
    setSubiendo(false);
  };

  const guardar = async () => {
    setGuardando(true);
    setMensaje('');

    const datos = {
      nombre_negocio: form.nombre_negocio,
      slogan: form.slogan,
      whatsapp_contacto: form.whatsapp_contacto,
      telefono: form.telefono,
      direccion: form.direccion,
      logo_url: form.logo_url || null,
      hero_titulo: form.hero_titulo,
      hero_subtitulo: form.hero_subtitulo,
      hero_imagen_url: form.hero_imagen_url || null,
      hero_badge: form.hero_badge,
      hero_boton_texto: form.hero_boton_texto,
      hero_boton_secundario_texto: form.hero_boton_secundario_texto,
      color_primario: form.color_primario,
      color_secundario: form.color_secundario,
      color_acento: form.color_acento,
      color_fondo: form.color_fondo,
      color_texto: form.color_texto,
      texto_categorias_titulo: form.texto_categorias_titulo,
      texto_categorias_subtitulo: form.texto_categorias_subtitulo,
      texto_catalogo_titulo: form.texto_catalogo_titulo,
      texto_catalogo_subtitulo: form.texto_catalogo_subtitulo,
      texto_servicios_titulo: form.texto_servicios_titulo,
      texto_servicios_subtitulo: form.texto_servicios_subtitulo,
      texto_contacto_titulo: form.texto_contacto_titulo,
      texto_contacto_subtitulo: form.texto_contacto_subtitulo,
      texto_footer: form.texto_footer,
      redes_sociales: redes,
      horario: horario,
    };

    try {
      if (config?.id) {
        await supabase.from('configuracion').update(datos).eq('id', config.id);
      } else {
        await supabase.from('configuracion').insert(datos);
      }
      setMensaje('Cambios guardados correctamente');
      cargar();
    } catch {
      setMensaje('Error al guardar');
    }

    setGuardando(false);
    setTimeout(() => setMensaje(''), 4000);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'hero', label: 'Hero / Inicio' },
    { id: 'colores', label: 'Colores' },
    { id: 'textos', label: 'Textos' },
    { id: 'redes', label: 'Redes Sociales' },
    { id: 'horario', label: 'Horario' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-[#2980b9] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex gap-6 items-start">
      {/* Controles */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Personalizacion del Sitio</h1>
            <p className="text-gray-400 text-xs mt-0.5">Los cambios se previsualizan en tiempo real</p>
          </div>
          <button onClick={guardar} disabled={guardando}
            className="px-5 py-2 bg-[#2980b9] hover:bg-[#2471a3] text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 flex items-center gap-2 self-start">
            {guardando ? (
              <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Guardando...</>
            ) : 'Guardar Cambios'}
          </button>
        </div>

        {mensaje && (
          <div className={`mb-3 p-2.5 rounded-xl text-sm font-medium ${mensaje.startsWith('Cambios') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {mensaje}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4 bg-gray-100 p-1 rounded-xl">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: General */}
        {tab === 'general' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Informacion del Negocio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Nombre del negocio" value={form.nombre_negocio || ''} onChange={v => setForm(p => ({ ...p, nombre_negocio: v }))} />
              <InputField label="Slogan" value={form.slogan || ''} onChange={v => setForm(p => ({ ...p, slogan: v }))} />
              <InputField label="WhatsApp (con codigo de pais)" value={form.whatsapp_contacto || ''} onChange={v => setForm(p => ({ ...p, whatsapp_contacto: v }))} placeholder="5219611234567" />
              <InputField label="Telefono" value={form.telefono || ''} onChange={v => setForm(p => ({ ...p, telefono: v }))} />
              <div className="md:col-span-2">
                <InputField label="Direccion" value={form.direccion || ''} onChange={v => setForm(p => ({ ...p, direccion: v }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Logo del negocio</label>
              <div className="flex items-center gap-3">
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" className="w-14 h-14 rounded-xl object-cover border" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                <label className="cursor-pointer px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                  {subiendoLogo ? 'Subiendo...' : 'Subir logo'}
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && subirImagen(e.target.files[0], 'logo')} />
                </label>
                {form.logo_url && <button onClick={() => setForm(p => ({ ...p, logo_url: '' }))} className="text-red-400 hover:text-red-600 text-xs">Quitar</button>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Texto del Footer</label>
              <textarea value={form.texto_footer || ''} onChange={e => setForm(p => ({ ...p, texto_footer: e.target.value }))} rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#2980b9] transition-all text-sm" />
            </div>
          </div>
        )}

        {/* Tab: Hero */}
        {tab === 'hero' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Seccion Hero / Inicio</h2>
            <InputField label="Titulo principal" value={form.hero_titulo || ''} onChange={v => setForm(p => ({ ...p, hero_titulo: v }))} />
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitulo</label>
              <textarea value={form.hero_subtitulo || ''} onChange={e => setForm(p => ({ ...p, hero_subtitulo: e.target.value }))} rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#2980b9] transition-all text-sm" />
            </div>
            <InputField label="Badge (etiqueta)" value={form.hero_badge || ''} onChange={v => setForm(p => ({ ...p, hero_badge: v }))} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Boton principal" value={form.hero_boton_texto || ''} onChange={v => setForm(p => ({ ...p, hero_boton_texto: v }))} />
              <InputField label="Boton secundario" value={form.hero_boton_secundario_texto || ''} onChange={v => setForm(p => ({ ...p, hero_boton_secundario_texto: v }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Imagen del Hero</label>
              <div className="flex items-center gap-4">
                {form.hero_imagen_url ? (
                  <img src={form.hero_imagen_url} alt="Hero" className="w-32 h-20 rounded-xl object-cover border" />
                ) : (
                  <div className="w-32 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors">
                    {subiendoHero ? 'Subiendo...' : 'Subir imagen'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && subirImagen(e.target.files[0], 'hero')} />
                  </label>
                  {form.hero_imagen_url && <button onClick={() => setForm(p => ({ ...p, hero_imagen_url: '' }))} className="text-red-400 hover:text-red-600 text-xs text-left">Quitar</button>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Colores */}
        {tab === 'colores' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Paleta de Colores</h2>
            <p className="text-xs text-gray-400">Se aplican en todo el sitio. Ve los cambios en la vista previa.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'color_primario', label: 'Primario', desc: 'Header, titulos' },
                { key: 'color_secundario', label: 'Secundario', desc: 'Acentos secundarios' },
                { key: 'color_acento', label: 'Acento', desc: 'Botones, precios' },
                { key: 'color_fondo', label: 'Fondo', desc: 'Fondos de secciones' },
                { key: 'color_texto', label: 'Texto', desc: 'Texto general' },
              ].map(c => (
                <div key={c.key} className="bg-gray-50 rounded-xl p-3">
                  <label className="block text-xs font-semibold text-gray-700 mb-0.5">{c.label}</label>
                  <p className="text-[10px] text-gray-400 mb-2">{c.desc}</p>
                  <div className="flex items-center gap-2">
                    <input type="color" value={form[c.key] || '#000000'} onChange={e => setForm(p => ({ ...p, [c.key]: e.target.value }))} className="w-9 h-8 rounded-lg border border-gray-200 cursor-pointer" />
                    <input type="text" value={form[c.key] || ''} onChange={e => setForm(p => ({ ...p, [c.key]: e.target.value }))} className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Textos */}
        {tab === 'textos' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Textos de las Secciones</h2>
            {[
              { titulo: 'texto_categorias_titulo', subtitulo: 'texto_categorias_subtitulo', seccion: 'Categorias' },
              { titulo: 'texto_catalogo_titulo', subtitulo: 'texto_catalogo_subtitulo', seccion: 'Catalogo' },
              { titulo: 'texto_servicios_titulo', subtitulo: 'texto_servicios_subtitulo', seccion: 'Servicios' },
              { titulo: 'texto_contacto_titulo', subtitulo: 'texto_contacto_subtitulo', seccion: 'Contacto' },
            ].map(s => (
              <div key={s.titulo} className="bg-gray-50 rounded-xl p-3 space-y-2">
                <h3 className="text-xs font-bold text-gray-600">{s.seccion}</h3>
                <InputField label="Titulo" value={form[s.titulo] || ''} onChange={v => setForm(p => ({ ...p, [s.titulo]: v }))} />
                <InputField label="Subtitulo" value={form[s.subtitulo] || ''} onChange={v => setForm(p => ({ ...p, [s.subtitulo]: v }))} />
              </div>
            ))}
          </div>
        )}

        {/* Tab: Redes */}
        {tab === 'redes' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Redes Sociales</h2>
            <InputField label="Facebook" value={redes.facebook} onChange={v => setRedes(p => ({ ...p, facebook: v }))} placeholder="https://facebook.com/tu-pagina" />
            <InputField label="Instagram" value={redes.instagram} onChange={v => setRedes(p => ({ ...p, instagram: v }))} placeholder="https://instagram.com/tu-cuenta" />
            <InputField label="TikTok" value={redes.tiktok} onChange={v => setRedes(p => ({ ...p, tiktok: v }))} placeholder="https://tiktok.com/@tu-usuario" />
          </div>
        )}

        {/* Tab: Horario */}
        {tab === 'horario' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Horario de Atencion</h2>
            {[
              { key: 'lunes', label: 'Lunes' }, { key: 'martes', label: 'Martes' },
              { key: 'miercoles', label: 'Miercoles' }, { key: 'jueves', label: 'Jueves' },
              { key: 'viernes', label: 'Viernes' }, { key: 'sabado', label: 'Sabado' },
              { key: 'domingo', label: 'Domingo' },
            ].map(dia => (
              <div key={dia.key} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-700 w-20">{dia.label}</span>
                <input type="text" value={horario[dia.key] || ''} onChange={e => setHorario(p => ({ ...p, [dia.key]: e.target.value }))}
                  placeholder="9:00 am - 6:00 pm" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#2980b9] transition-all text-sm" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vista previa movil */}
      <div className="hidden lg:block sticky top-20 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-500 text-center mb-2">Vista previa movil</p>
        <div className="relative">
          <div className="w-[220px] h-[440px] bg-gray-900 rounded-[2rem] p-[6px] shadow-2xl shadow-black/20">
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[14px] bg-gray-900 rounded-b-xl z-20" />
            <div className="w-full h-full bg-white rounded-[1.6rem] overflow-hidden relative">
              <div className="h-5 bg-gray-900 flex items-center justify-between px-5 text-white" style={{ fontSize: '6px' }}>
                <span>9:41</span>
                <div className="flex gap-0.5 items-center">
                  <div className="w-2.5 h-1.5 border border-white/60 rounded-sm"><div className="w-1.5 h-full bg-white rounded-sm" /></div>
                </div>
              </div>
              <div className="h-[calc(100%-20px)] overflow-hidden">
                <MobilePreview config={form} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
