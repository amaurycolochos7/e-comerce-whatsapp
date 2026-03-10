'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { abrirWhatsApp } from '@/lib/whatsapp';
import type { Producto, Configuracion } from '@/lib/types';

interface Props {
  producto: Producto;
  whatsapp: string;
  config: Configuracion | null;
}

export default function ProductDetail({ producto, whatsapp }: Props) {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const tieneDescuento = producto.precio_anterior && producto.precio_anterior > producto.precio;

  const handleWhatsApp = () => {
    const msg = `Hola, me interesa: *${producto.nombre}* - $${producto.precio.toFixed(2)}\n¿Está disponible?`;
    abrirWhatsApp(whatsapp, msg);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="bg-gray-50 border border-gray-200 rounded p-8 flex items-center justify-center aspect-square">
          {producto.imagen_url ? (
            <img src={producto.imagen_url} alt={producto.nombre} className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-gray-300">
              <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {producto.categorias && (
            <p className="text-sm text-[#2980b9] mb-1">{producto.categorias.nombre}</p>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{producto.nombre}</h1>

          <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-200">
            <span className="text-3xl font-bold text-gray-900">${producto.precio.toFixed(2)}</span>
            {tieneDescuento && (
              <>
                <span className="text-lg text-gray-400 line-through">${producto.precio_anterior!.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  -{Math.round(((producto.precio_anterior! - producto.precio) / producto.precio_anterior!) * 100)}%
                </span>
              </>
            )}
          </div>

          {producto.descripcion && (
            <p className="text-gray-600 mb-5 leading-relaxed text-sm">{producto.descripcion}</p>
          )}

          {/* Detalles - estilo lista */}
          <div className="space-y-2 mb-6 text-sm">
            {producto.compatibilidad && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-40 shrink-0">Compatibilidad:</span>
                <span className="text-gray-600">{producto.compatibilidad}</span>
              </div>
            )}
            {producto.que_incluye && (
              <div>
                <p className="font-semibold text-gray-700 mb-1">Qué incluye:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-0.5 ml-2">
                  {producto.que_incluye.split('\n').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {producto.duracion_licencia && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-40 shrink-0">Duración:</span>
                <span className="text-gray-600">{producto.duracion_licencia}</span>
              </div>
            )}
            {producto.forma_entrega && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-40 shrink-0">Forma de entrega:</span>
                <span className="text-gray-600">{producto.forma_entrega}</span>
              </div>
            )}
            {producto.soporte && (
              <div className="flex gap-2">
                <span className="font-semibold text-gray-700 w-40 shrink-0">Soporte:</span>
                <span className="text-gray-600">{producto.soporte}</span>
              </div>
            )}
          </div>

          {/* Cantidad y botones */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-2 hover:bg-gray-100 text-gray-600 text-sm">−</button>
              <span className="px-4 py-2 font-medium text-center min-w-[2.5rem] text-sm border-x border-gray-300">{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-2 hover:bg-gray-100 text-gray-600 text-sm">+</button>
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < cantidad; i++) {
                  addItem({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen_url: producto.imagen_url, tipo: 'producto' });
                }
              }}
              className="flex-1 py-2.5 bg-white border-2 border-[#2980b9] text-[#2980b9] font-semibold rounded text-sm hover:bg-[#2980b9] hover:text-white transition-colors"
            >
              Añadir al Carrito
            </button>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full py-2.5 bg-[#25d366] text-white font-bold rounded text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            PEDIR POR WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
}
