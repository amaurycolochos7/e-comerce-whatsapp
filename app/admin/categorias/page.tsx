'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Categoria } from '@/lib/types';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', orden: '0' });
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const cargar = async () => {
    const { data } = await supabase.from('categorias').select('*').order('orden');
    setCategorias((data as Categoria[]) || []);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setEditando(null); setForm({ nombre: '', descripcion: '', orden: '0' }); setImagen(null); setFormAbierto(true); };
  const abrirEditar = (c: Categoria) => { setEditando(c); setForm({ nombre: c.nombre, descripcion: c.descripcion || '', orden: String(c.orden) }); setFormAbierto(true); };

  const subirImagen = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const name = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('categorias').upload(name, file);
    if (error) return null;
    // Usar signed URL para que funcione sin importar si el bucket es público
    const { data: signedData } = await supabase.storage.from('categorias').createSignedUrl(name, 315360000);
    if (signedData?.signedUrl) return signedData.signedUrl;
    const { data } = supabase.storage.from('categorias').getPublicUrl(name);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imagenUrl = editando?.imagen_url || null;
    if (imagen) { const url = await subirImagen(imagen); if (url) imagenUrl = url; }

    const datos = { nombre: form.nombre, descripcion: form.descripcion || null, orden: parseInt(form.orden), imagen_url: imagenUrl };
    if (editando) await supabase.from('categorias').update(datos).eq('id', editando.id);
    else await supabase.from('categorias').insert(datos);

    setFormAbierto(false);
    setLoading(false);
    cargar();
  };

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    await supabase.from('categorias').delete().eq('id', id);
    cargar();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gestión de Categorías</h2>
          <p className="text-sm text-gray-400">{categorias.length} categorías</p>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-2.5 bg-[#4da8da] text-white text-sm font-medium rounded-xl hover:bg-[#3d96c7] transition-all">+ Nueva Categoría</button>
      </div>

      {formAbierto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-gray-800 mb-4">{editando ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nombre *</label>
                <input required value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Orden</label>
                <input type="number" value={form.orden} onChange={(e) => setForm({...form, orden: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Imagen</label>
                <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setFormAbierto(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#4da8da] text-white rounded-xl text-sm font-medium hover:bg-[#3d96c7] disabled:opacity-50">{loading ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  {c.imagen_url ? <img src={c.imagen_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📁</div>}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{c.nombre}</h3>
                  <p className="text-xs text-gray-400">Orden: {c.orden}</p>
                </div>
              </div>
            </div>
            {c.descripcion && <p className="text-sm text-gray-500 mt-3">{c.descripcion}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => abrirEditar(c)} className="text-sm text-[#4da8da] hover:underline">Editar</button>
              <button onClick={() => eliminar(c.id)} className="text-sm text-red-400 hover:underline">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
