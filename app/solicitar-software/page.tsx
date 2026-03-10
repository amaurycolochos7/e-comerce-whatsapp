'use client';

import { useState } from 'react';
import { generarMensajeSolicitud, abrirWhatsApp } from '@/lib/whatsapp';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function SolicitarSoftwarePage() {
  const [form, setForm] = useState({ nombre: '', whatsapp: '', programa: '', version: '', sistemaOperativo: '', comentario: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generarMensajeSolicitud(form);
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Solicitar Software</h1>
            <p className="text-gray-400">No encuentras el programa que necesitas? Solicitalo aqui</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded p-6 md:p-8 border border-gray-200 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" required value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input type="tel" required value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="961 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Programa solicitado</label>
              <input type="text" required value={form.programa} onChange={(e) => setForm({...form, programa: e.target.value})}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="Ej: Adobe Photoshop, Matlab..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Version (opcional)</label>
                <input type="text" value={form.version} onChange={(e) => setForm({...form, version: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm" placeholder="2024, ultima..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sistema operativo</label>
                <select required value={form.sistemaOperativo} onChange={(e) => setForm({...form, sistemaOperativo: e.target.value})}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm">
                  <option value="">Seleccionar...</option>
                  <option value="Windows 10">Windows 10</option>
                  <option value="Windows 11">Windows 11</option>
                  <option value="macOS">macOS</option>
                  <option value="Linux">Linux</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comentario adicional</label>
              <textarea value={form.comentario} onChange={(e) => setForm({...form, comentario: e.target.value})} rows={3}
                className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:border-[#2980b9] text-sm resize-none" placeholder="Informacion adicional..." />
            </div>

            <button type="submit" className="w-full py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded text-sm transition-colors">
              ENVIAR SOLICITUD POR WHATSAPP
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
