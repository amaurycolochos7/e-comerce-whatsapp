'use client';

import { useCart } from '@/lib/CartContext';
import { generarMensajeCarrito, abrirWhatsApp } from '@/lib/whatsapp';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } = useCart();
  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  const enviarWhatsApp = () => {
    const msg = generarMensajeCarrito(items);
    abrirWhatsApp('', msg);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#2980b9]">
          <h2 className="font-bold text-white text-lg">Mi Carrito</h2>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-white/80 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 border border-gray-200 rounded">
                  {/* Imagen */}
                  <div className="w-16 h-16 rounded bg-white border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.imagen_url ? (
                      <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-contain p-1" />
                    ) : (
                      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.nombre}</p>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">${item.precio.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} className="w-6 h-6 border border-gray-300 rounded text-xs flex items-center justify-center hover:bg-gray-100">−</button>
                      <span className="text-sm font-medium w-6 text-center">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} className="w-6 h-6 border border-gray-300 rounded text-xs flex items-center justify-center hover:bg-gray-100">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={enviarWhatsApp}
              className="w-full py-2.5 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold rounded text-sm transition-colors flex items-center justify-center gap-2"
            >
              ENVIAR PEDIDO POR WHATSAPP
            </button>
            <button onClick={clearCart} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors">
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
