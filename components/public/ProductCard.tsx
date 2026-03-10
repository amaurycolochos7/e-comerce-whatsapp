'use client';

import { useCart } from '@/lib/CartContext';
import type { Producto, Configuracion } from '@/lib/types';
import Link from 'next/link';

interface Props {
  producto: Producto;
  whatsapp: string;
  config: Configuracion | null;
}

export default function ProductCard({ producto }: Props) {
  const { addItem } = useCart();
  const tieneDescuento = producto.precio_anterior && producto.precio_anterior > producto.precio;

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-4">
        {tieneDescuento && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
            -{Math.round(((producto.precio_anterior! - producto.precio) / producto.precio_anterior!) * 100)}%
          </div>
        )}
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 border-t border-gray-100">
        <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 leading-snug min-h-[2.5rem]">{producto.nombre}</h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">${producto.precio.toFixed(2)}</span>
          {tieneDescuento && (
            <span className="text-xs text-gray-400 line-through">${producto.precio_anterior!.toFixed(2)}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/producto/${producto.id}`}
            className="flex-1 py-1.5 text-xs font-medium text-center rounded border border-[#2980b9] text-[#2980b9] hover:bg-[#2980b9] hover:text-white transition-colors"
          >
            Ver Detalle
          </Link>
          <button
            onClick={() => addItem({
              id: producto.id,
              nombre: producto.nombre,
              precio: producto.precio,
              imagen_url: producto.imagen_url,
              tipo: 'producto',
            })}
            className="flex-1 py-1.5 text-xs font-medium text-center rounded bg-[#2980b9] text-white hover:bg-[#2471a3] transition-colors"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
