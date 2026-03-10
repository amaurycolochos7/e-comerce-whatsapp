import type { Categoria, Configuracion } from '@/lib/types';

interface Props {
  categorias: Categoria[];
  config: Configuracion | null;
}

export default function Categories({ categorias, config }: Props) {
  const titulo = config?.texto_categorias_titulo || 'Explora Nuestras Categorías';

  return (
    <section id="categorias" className="py-8 bg-[#f8f9fa] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{titulo}</h2>
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <a
              key={cat.id}
              href={`/catalogo?cat=${cat.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded hover:border-[#2980b9] hover:text-[#2980b9] transition-colors text-sm text-gray-700"
            >
              {cat.imagen_url ? (
                <img src={cat.imagen_url} alt={cat.nombre} className="w-5 h-5 object-contain" />
              ) : (
                <span className="text-xs text-gray-400">--</span>
              )}
              {cat.nombre}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
