import { useEffect, useState } from 'react';
import { fetchAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

export const HomeUser = () => {
  const [clubs, setClubs] = useState([]);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
   fetchAPI('/products/category/sports-accessories')
      .then(data => setClubs(data.products.slice(0, 8)))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Premium */}
      <nav className="sticky top-0 z-10 shadow-md bg-emerald-800">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xl font-black text-white tracking-tight">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
            GREEN<span className="text-emerald-300">CLUB</span>
          </div>
          <button onClick={logout} className="px-5 py-2 text-sm font-semibold transition-colors bg-white rounded-full text-emerald-900 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-400">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Catálogo de Material y Campos</h1>
          <p className="mt-3 text-lg text-slate-500">Explora las últimas novedades reservadas para nuestros socios.</p>
        </div>

        {/* Grid Responsive Obligatorio */}
        <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clubs.map((club) => (
            <div key={club.id} className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-center overflow-hidden bg-slate-200 h-48">
   <img 
     src={club.thumbnail} 
     alt={club.title} 
     className="object-cover w-full h-full" 
   />
</div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-bold leading-tight text-slate-900 line-clamp-2">{club.title}</h2>
                </div>
                <p className="flex-1 mb-4 text-sm text-slate-600 line-clamp-3">{club.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-2xl font-black text-emerald-600">{club.price}€</span>
                  <button className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100">Ver detalles</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};