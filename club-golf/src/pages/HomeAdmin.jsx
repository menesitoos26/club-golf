import { useForm } from 'react-hook-form';
import { fetchAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useState, useEffect } from 'react';

export const HomeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const logout = useAuthStore((state) => state.logout);
  const [items, setItems] = useState([]);

  // Cargamos los items para que el admin tenga algo que borrar
  useEffect(() => {
    fetchAPI('/products/category/sports-accessories')
      .then(data => setItems(data.products.slice(0, 5)))
      .catch(console.error);
  }, []);

  // Función POST (Ya la tenías)
  const onSubmit = async (data) => {
    try {
      await fetchAPI('/products/add', 'POST', data);
      alert('✅ Registro completado  en la base de datos.');
      reset();
    } catch (error) {
      alert('❌ Error en el POST.');
    }
  };

  // NUEVA FUNCIONALIDAD: Función DELETE
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        // Ejecutamos el método DELETE a la API
        const response = await fetchAPI(`/products/${id}`, 'DELETE');
        console.log('Respuesta DELETE:', response);
        
        // Actualizamos el estado local para que desaparezca de la vista
        setItems(items.filter(item => item.id !== id));
        alert('🗑️ Registro eliminado con éxito (DELETE).');
      } catch (error) {
        alert('❌ Error al intentar eliminar.');
      }
    }
  };

  return (
    <div className="min-h-screen text-slate-200 bg-slate-900">
      <nav className="border-b bg-slate-950 border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
            <span className="px-2 py-1 text-xs text-black bg-yellow-400 rounded">ADMIN</span>
            GREEN<span className="text-slate-500">CLUB</span>
          </div>
          <button onClick={logout} className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-red-600 rounded hover:bg-red-700">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="px-4 py-12 mx-auto max-w-4xl">
        {/* SECCIÓN 1: POST */}
        <div className="p-8 mb-8 border bg-slate-800 border-slate-700 rounded-2xl shadow-2xl">
          <h2 className="mb-6 text-xl font-bold text-white">Añadir Nuevo Artículo</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
            <input 
              {...register('title', { required: true })} 
              placeholder="Nombre del Artículo"
              className="w-full px-4 py-2 text-white border bg-slate-900 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
            <input 
              type="number"
              {...register('price', { required: true })} 
              placeholder="Precio (€)"
              className="w-full px-4 py-2 text-white border bg-slate-900 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" className="w-full py-2 font-bold text-white transition-all bg-emerald-600 rounded-xl hover:bg-emerald-500">
              Registrar
            </button>
          </form>
        </div>

        {/* SECCIÓN 2: DELETE (NUEVA FUNCIONALIDAD) */}
        <div className="p-8 border bg-slate-800 border-slate-700 rounded-2xl shadow-2xl">
          <h2 className="mb-6 text-xl font-bold text-white">Gestión de Inventario</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border bg-slate-900 border-slate-700 rounded-xl">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.price} €</p>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 text-sm font-bold text-red-500 transition-colors bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};