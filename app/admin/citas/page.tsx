'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CitaReparacion } from '@/lib/types';

export default function AdminCitas() {
  const [citas, setCitas] = useState<CitaReparacion[]>([]);

  const supabase = createClient();

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase.from('citas_reparacion').select('*').order('fecha', { ascending: false });
      setCitas((data as CitaReparacion[]) || []);
    };
    cargar();
  }, []);

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar esta cita?')) return;
    await supabase.from('citas_reparacion').delete().eq('id', id);
    setCitas(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Citas de Reparación</h2>
        <p className="text-sm text-gray-400">{citas.length} citas registradas</p>
      </div>

      <div className="space-y-4">
        {citas.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{c.tipo_equipo} - {c.marca}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{c.fecha} | {c.hora}</p>
              </div>
              <button onClick={() => eliminar(c.id)} className="text-sm text-red-400 hover:underline">Eliminar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
              <div><span className="text-gray-400">Nombre:</span> <span className="text-gray-700">{c.nombre}</span></div>
              <div><span className="text-gray-400">WhatsApp:</span> <span className="text-gray-700">{c.whatsapp}</span></div>
              <div className="sm:col-span-2"><span className="text-gray-400">Problema:</span> <span className="text-gray-700">{c.problema}</span></div>
            </div>
          </div>
        ))}
        {citas.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No hay citas registradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
