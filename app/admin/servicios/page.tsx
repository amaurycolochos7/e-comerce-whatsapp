'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Servicio } from '@/lib/types';

export default function AdminServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formAbierto, setFormAbierto] = useState(false);
  const [editando, setEditando] = useState<Servicio | null>(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', categoria_servicio: 'computadoras', activo: true });
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const cargar = async () => {
    const { data } = await supabase.from('servicios').select('*').order('created_at', { ascending: false });
    setServicios((data as Servicio[]) || []);
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setEditando(null); setForm({ nombre: '', descripcion: '', precio: '', categoria_servicio: 'computadoras', activo: true }); setImagen(null); setFormAbierto(true); };
  const abrirEditar = (s: Servicio) => { setEditando(s); setForm({ nombre: s.nombre, descripcion: s.descripcion || '', precio: String(s.precio), categoria_servicio: s.categoria_servicio, activo: s.activo }); setFormAbierto(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imagenUrl = editando?.imagen_url || null;
    if (imagen) {
      const ext = imagen.name.split('.').pop();
      const name = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('servicios').upload(name, imagen);
      if (!error) { const { data } = supabase.storage.from('servicios').getPublicUrl(name); imagenUrl = data.publicUrl; }
    }

    const datos = { nombre: form.nombre, descripcion: form.descripcion || null, precio: parseFloat(form.precio), categoria_servicio: form.categoria_servicio, activo: form.activo, imagen_url: imagenUrl };
    if (editando) await supabase.from('servicios').update(datos).eq('id', editando.id);
    else await supabase.from('servicios').insert(datos);

    setFormAbierto(false);
    setLoading(false);
    cargar();
  };

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    await supabase.from('servicios').delete().eq('id', id);
    cargar();
  };

  const catLabels: Record<string, string> = { computadoras: 'Computadoras', mantenimiento: 'Mantenimiento', celulares: 'Celulares' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gestión de Servicios</h2>
          <p className="text-sm text-gray-400">{servicios.length} servicios</p>
        </div>
        <button onClick={abrirNuevo} className="px-5 py-2.5 bg-[#4da8da] text-white text-sm font-medium rounded-xl hover:bg-[#3d96c7] transition-all">+ Nuevo Servicio</button>
      </div>

      {formAbierto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-gray-800 mb-4">{editando ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nombre *</label>
                <input required value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Categoría de servicio</label>
                <select value={form.categoria_servicio} onChange={(e) => setForm({...form, categoria_servicio: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]">
                  <option value="computadoras">Servicios para Computadoras</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="celulares">Servicios para Celulares</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Precio</label>
                <input type="number" step="0.01" required value={form.precio} onChange={(e) => setForm({...form, precio: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#4da8da] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Imagen</label>
                <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.activo} onChange={(e) => setForm({...form, activo: e.target.checked})} className="rounded" /> Activo
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setFormAbierto(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-[#4da8da] text-white rounded-xl text-sm font-medium hover:bg-[#3d96c7] disabled:opacity-50">{loading ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Servicio</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Categoría</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Precio</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Estado</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {servicios.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-sm text-gray-800">{s.nombre}</td>
                <td className="py-3 px-4 text-sm text-gray-500">{catLabels[s.categoria_servicio] || s.categoria_servicio}</td>
                <td className="py-3 px-4 text-sm font-medium">${s.precio.toFixed(2)}</td>
                <td className="py-3 px-4"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.activo ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{s.activo ? 'Activo' : 'Inactivo'}</span></td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => abrirEditar(s)} className="text-sm text-[#4da8da] hover:underline mr-3">Editar</button>
                  <button onClick={() => eliminar(s.id)} className="text-sm text-red-400 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {servicios.length === 0 && <div className="text-center py-12 text-gray-400"><p>No hay servicios aún</p></div>}
      </div>
    </div>
  );
}
