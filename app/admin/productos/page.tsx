'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Producto, Categoria } from '@/lib/types';

export default function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', precio_anterior: '', categoria_id: '', destacado: false, activo: true, compatibilidad: '', duracion_licencia: '', que_incluye: '', forma_entrega: '', soporte: '' });
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const cargarDatos = async () => {
    const [prodRes, catRes] = await Promise.all([
      supabase.from('productos').select('*, categorias(nombre)').order('created_at', { ascending: false }),
      supabase.from('categorias').select('*').order('orden'),
    ]);
    setProductos((prodRes.data as Producto[]) || []);
    setCategorias((catRes.data as Categoria[]) || []);
  };

  useEffect(() => { cargarDatos(); }, []);

  const abrirEditar = (p: Producto) => {
    setEditando(p);
    setForm({ nombre: p.nombre, descripcion: p.descripcion || '', precio: String(p.precio), precio_anterior: String(p.precio_anterior || ''), categoria_id: p.categoria_id || '', destacado: p.destacado, activo: p.activo, compatibilidad: p.compatibilidad || '', duracion_licencia: p.duracion_licencia || '', que_incluye: p.que_incluye || '', forma_entrega: p.forma_entrega || '', soporte: p.soporte || '' });
    setFormAbierto(true);
  };

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: '', descripcion: '', precio: '', precio_anterior: '', categoria_id: '', destacado: false, activo: true, compatibilidad: '', duracion_licencia: '', que_incluye: '', forma_entrega: '', soporte: '' });
    setImagen(null);
    setFormAbierto(true);
  };

  const subirImagen = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const name = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('productos').upload(name, file);
    if (error) return null;
    // Usar signed URL para que funcione sin importar si el bucket es público
    const { data: signedData } = await supabase.storage.from('productos').createSignedUrl(name, 315360000);
    if (signedData?.signedUrl) return signedData.signedUrl;
    const { data } = supabase.storage.from('productos').getPublicUrl(name);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imagenUrl = editando?.imagen_url || null;
    if (imagen) {
      const url = await subirImagen(imagen);
      if (url) imagenUrl = url;
    }

    const datos = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      precio: parseFloat(form.precio),
      precio_anterior: form.precio_anterior ? parseFloat(form.precio_anterior) : null,
      categoria_id: form.categoria_id || null,
      destacado: form.destacado,
      activo: form.activo,
      imagen_url: imagenUrl,
      compatibilidad: form.compatibilidad || null,
      duracion_licencia: form.duracion_licencia || null,
      que_incluye: form.que_incluye || null,
      forma_entrega: form.forma_entrega || null,
      soporte: form.soporte || null,
    };

    if (editando) {
      await supabase.from('productos').update(datos).eq('id', editando.id);
    } else {
      await supabase.from('productos').insert(datos);
    }

    setFormAbierto(false);
    setLoading(false);
    cargarDatos();
  };

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await supabase.from('productos').delete().eq('id', id);
    cargarDatos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gestión de Productos</h2>
          <p className="text-sm text-gray-400">{productos.length} productos</p>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-2.5 bg-[#4da8da] text-white text-sm font-medium rounded-xl hover:bg-[#3d96c7] transition-all">
          + Nuevo Producto
        </button>
      </div>

      {/* Modal formulario */}
      {formAbierto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl mb-10">
            <h3 className="font-bold text-lg text-gray-800 mb-4">{editando ? 'Editar Producto' : 'Nuevo Producto'}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Nombre *</label>
                <input required value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Precio *</label>
                <input type="number" step="0.01" required value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Precio anterior</label>
                <input type="number" step="0.01" value={form.precio_anterior} onChange={(e) => setForm({...form, precio_anterior: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" placeholder="Para mostrar descuento" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Categoría</label>
                <select value={form.categoria_id} onChange={(e) => setForm({...form, categoria_id: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]">
                  <option value="">Sin categoría</option>
                  {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Imagen</label>
                <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Compatibilidad</label>
                <input value={form.compatibilidad} onChange={(e) => setForm({...form, compatibilidad: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" placeholder="Windows 10/11" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Duración de licencia</label>
                <input value={form.duracion_licencia} onChange={(e) => setForm({...form, duracion_licencia: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" placeholder="De por vida / 1 año" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Qué incluye</label>
                <textarea value={form.que_incluye} onChange={(e) => setForm({...form, que_incluye: e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da] resize-none" placeholder="Clave de activación&#10;Guía de instalación" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Forma de entrega</label>
                <input value={form.forma_entrega} onChange={(e) => setForm({...form, forma_entrega: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" placeholder="Digital por WhatsApp" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Soporte</label>
                <input value={form.soporte} onChange={(e) => setForm({...form, soporte: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" placeholder="Soporte por WhatsApp" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.destacado} onChange={(e) => setForm({...form, destacado: e.target.checked})} className="rounded" />
                Destacado
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.activo} onChange={(e) => setForm({...form, activo: e.target.checked})} className="rounded" />
                Activo
              </label>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setFormAbierto(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#4da8da] text-white rounded-xl text-sm font-medium hover:bg-[#3d96c7] disabled:opacity-50">{loading ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Producto</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Categoría</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Precio</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Estado</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {productos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        {p.imagen_url ? <img src={p.imagen_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">IMG</div>}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{p.nombre}</p>
                        {p.destacado && <span className="text-[10px] text-[#4da8da] font-medium">Destacado</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{p.categorias?.nombre || '—'}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-sm">${p.precio.toFixed(2)}</span>
                    {p.precio_anterior && <span className="text-xs text-gray-400 line-through ml-1">${p.precio_anterior.toFixed(2)}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.activo ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => abrirEditar(p)} className="text-sm text-[#4da8da] hover:underline mr-3">Editar</button>
                    <button onClick={() => eliminar(p.id)} className="text-sm text-red-400 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productos.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No hay productos aún</p>
          </div>
        )}
      </div>
    </div>
  );
}
