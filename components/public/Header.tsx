'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import CartSidebar from './CartSidebar';
import type { Configuracion } from '@/lib/types';

interface Props {
  config: Configuracion | null;
}

export default function Header({ config }: Props) {
  const { items, setIsOpen } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const logoUrl = config?.logo_url;
  const nombre = config?.nombre_negocio || 'Soluciones Tecnológicas El Inge';

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Software' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/catalogo?cat=ofertas', label: 'Ofertas' },
    { href: '/citas', label: 'Citas' },
    { href: '/soporte', label: 'Soporte' },
  ];

  return (
    <>
      {/* Barra superior informativa */}
      <div className="bg-[#1e6091] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>Base de registros. ¡Bienvenido a nuestra tienda!</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>Color cruzadora</span>
            <span>|</span>
            <span>Secondary</span>
          </div>
        </div>
      </div>

      {/* Header principal - fondo blanco */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={nombre} className="h-10 w-auto object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded bg-[#2980b9] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <p className="font-bold text-[#1a365d] text-sm leading-tight">TechStore</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Licencias &amp; Servicios</p>
                </div>
              </div>
            )}
          </Link>

          {/* Buscador */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-[#2980b9]"
              />
              <button className="absolute right-0 top-0 h-full px-3 bg-gray-100 border-l border-gray-300 rounded-r hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carrito */}
          <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 text-gray-600 hover:text-[#2980b9] transition-colors relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {totalItems > 0 && (
              <span className="text-sm font-medium">{totalItems} Items</span>
            )}
          </button>

          {/* Hamburger mobile */}
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden p-1">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuAbierto ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Barra de navegación azul */}
        <nav className="bg-[#2980b9]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 text-white text-sm font-medium hover:bg-[#3498db] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {/* Búsqueda móvil */}
            <div className="p-3">
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-[#2980b9]"
              />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAbierto(false)}
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  );
}
