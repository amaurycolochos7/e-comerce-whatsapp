'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SolicitudSoftware } from '@/lib/types';

export default function AdminSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudSoftware[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase.from('solicitudes_software').select('*').order('created_at', { ascending: false });
      setSolicitudes((data as SolicitudSoftware[]) || []);
    };
    cargar();
  }, []);

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta solicitud?')) return;
    await supabase.from('solicitudes_software').delete().eq('id', id);
    setSolicitudes(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Solicitudes de Software</h2>
        <p className="text-sm text-gray-400">{solicitudes.length} solicitudes recibidas</p>
      </div>

      <div className="space-y-4">
        {solicitudes.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{s.programa}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Recibida: {new Date(s.created_at).toLocaleDateString('es-MX')}</p>
              </div>
              <button onClick={() => eliminar(s.id)} className="text-sm text-red-400 hover:underline">Eliminar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
              <div><span className="text-gray-400">Nombre:</span> <span className="text-gray-700">{s.nombre}</span></div>
              <div><span className="text-gray-400">WhatsApp:</span> <span className="text-gray-700">{s.whatsapp}</span></div>
              {s.version && <div><span className="text-gray-400">Versión:</span> <span className="text-gray-700">{s.version}</span></div>}
              <div><span className="text-gray-400">S.O.:</span> <span className="text-gray-700">{s.sistema_operativo}</span></div>
              {s.comentario && <div className="sm:col-span-2"><span className="text-gray-400">Comentario:</span> <span className="text-gray-700">{s.comentario}</span></div>}
            </div>
          </div>
        ))}
        {solicitudes.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No hay solicitudes aún</p>
          </div>
        )}
      </div>
    </div>
  );
}
