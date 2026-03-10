'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [slogan, setSlogan] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const cargarConfig = async () => {
      const { data } = await supabase.from('configuracion').select('logo_url, nombre_negocio, slogan').limit(1).single();
      if (data) {
        setLogoUrl(data.logo_url);
        setNombreNegocio(data.nombre_negocio || '');
        setSlogan(data.slogan || '');
      }
    };
    cargarConfig();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('CREDENCIALES INVÁLIDAS. Por favor, intente de nuevo.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #c7d9f0 30%, #b6c8e0 70%, #e0e8f0 100%)',
      }}
    >
      <div className="w-full max-w-sm">
        {/* --- Card --- */}
        <div
          className="bg-white rounded-2xl p-8 space-y-6"
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)',
          }}
        >
          {/* Logo & Title */}
          <div className="text-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={nombreNegocio}
                className="mx-auto mb-4 object-contain"
                style={{ maxHeight: '80px', maxWidth: '240px' }}
              />
            ) : (
              <div className="mb-4">
                <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">Sube tu logo desde Configuración</p>
              </div>
            )}
            <h1
              className="font-extrabold tracking-wide"
              style={{ fontSize: '15px', color: '#1a2332', letterSpacing: '0.05em' }}
            >
              PANEL DE ADMINISTRACIÓN
            </h1>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              className="rounded-xl py-2.5 px-4 text-center text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5" style={{ letterSpacing: '0.03em' }}>
                Correo electrónico del administrador
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5" style={{ letterSpacing: '0.03em' }}>
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
                style={{ backgroundColor: rememberMe ? '#2563eb' : '#d1d5db' }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300"
                  style={{ transform: rememberMe ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </button>
              <span className="text-sm text-gray-600 font-medium">Recuérdame</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-60 tracking-wide"
              style={{
                background: 'linear-gradient(135deg, #1a2a4a, #1e3a5f)',
                fontSize: '14px',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 14px rgba(26, 42, 74, 0.3)',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 42, 74, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 42, 74, 0.3)'; }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                'INICIAR SESIÓN'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500/60 text-xs mt-6">
          <a href="/" className="hover:text-gray-600 transition-colors">
            Sobre {nombreNegocio || 'el sitio'}
          </a>
        </p>
      </div>
    </div>
  );
}
