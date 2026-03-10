'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Producto, Categoria, Configuracion } from '@/lib/types';

interface Props {
  productos: Producto[];
  categorias: Categoria[];
  whatsapp: string;
  config: Configuracion | null;
}

export default function ProductCatalog({ productos, categorias, whatsapp, config }: Props) {
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('default');
  const [busqueda, setBusqueda] = useState('');

  const titulo = config?.texto_catalogo_titulo || 'Productos Catálogo';

  let productosFiltrados = filtro === 'todos'
    ? productos
    : productos.filter((p) => p.categoria_id === filtro);

  if (busqueda.trim()) {
    const q = busqueda.toLowerCase();
    productosFiltrados = productosFiltrados.filter(p =>
      p.nombre.toLowerCase().includes(q) || (p.descripcion && p.descripcion.toLowerCase().includes(q))
    );
  }

  if (orden === 'precio-asc') productosFiltrados = [...productosFiltrados].sort((a, b) => a.precio - b.precio);
  if (orden === 'precio-desc') productosFiltrados = [...productosFiltrados].sort((a, b) => b.precio - a.precio);
  if (orden === 'nombre') productosFiltrados = [...productosFiltrados].sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <section id="catalogo" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{titulo}</h2>

        {/* Layout con sidebar de categorías */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar categorías (desktop) */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden">
              <div className="bg-[#2980b9] text-white text-sm font-semibold px-4 py-2.5">
                Categorías
              </div>
              <div>
                <button
                  onClick={() => setFiltro('todos')}
                  className={`w-full text-left px-4 py-2 text-sm border-b border-gray-100 transition-colors ${filtro === 'todos' ? 'bg-[#2980b9] text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Todos
                </button>
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFiltro(cat.id)}
                    className={`w-full text-left px-4 py-2 text-sm border-b border-gray-100 transition-colors ${filtro === cat.id ? 'bg-[#2980b9] text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Controles móviles */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:hidden">
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2980b9]"
              >
                <option value="todos">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            {/* Barra de filtros y orden */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <p className="text-sm text-gray-500">{productosFiltrados.length} productos encontrados</p>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2980b9]"
              >
                <option value="default">Ordenar por</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} whatsapp={whatsapp} config={config} />
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No se encontraron productos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
