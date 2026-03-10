'use client';

import { useState } from 'react';
import { generarMensajeCita, abrirWhatsApp } from '@/lib/whatsapp';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function CitasPage() {
  const [form, setForm] = useState({ nombre: '', whatsapp: '', tipoEquipo: '', marca: '', problema: '', fecha: '', hora: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generarMensajeCita(form);
    abrirWhatsApp('', msg);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <main>
      <Header config={null} />
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Programar Cita de Reparacion</h1>
            <p className="text-gray-400">Agenda tu cita y te atenderemos lo antes posible</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded p-6 md:p-8 border border-gray-200 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" required value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="Tu nombre completo" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero de WhatsApp</label>
              <input type="tel" required value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="961 123 4567" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Equipo</label>
                <select required value={form.tipoEquipo} onChange={(e) => setForm({...form, tipoEquipo: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm">
                  <option value="">Seleccionar...</option>
                  <option value="Computadora de escritorio">Computadora de escritorio</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Celular">Celular</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <input type="text" required value={form.marca} onChange={(e) => setForm({...form, marca: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="Samsung, HP, Dell..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Problema o servicio requerido</label>
              <textarea required value={form.problema} onChange={(e) => setForm({...form, problema: e.target.value})} rows={3}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm resize-none" placeholder="Describe el problema o servicio que necesitas..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha deseada</label>
                <input type="date" required value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora deseada</label>
                <input type="time" required value={form.hora} onChange={(e) => setForm({...form, hora: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded text-sm transition-colors">
              SOLICITAR CITA POR WHATSAPP
            </button>

            {enviado && (
              <div className="text-center text-sm text-green-600 bg-green-50 rounded py-3">Solicitud enviada por WhatsApp</div>
            )}
          </form>
        </div>
      </section>
      <Footer config={null} />
    </main>
  );
}
