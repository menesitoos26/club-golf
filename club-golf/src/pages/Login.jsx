import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Evaluación del rol en el frontend
    const role = data.email.includes('admin') ? 'admin' : 'user';
    const fakeToken = `token_falso_${role}_12345`;
    
    login({ email: data.email }, role, fakeToken);
    navigate(role === 'admin' ? '/admin' : '/user');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="flex flex-col w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl md:flex-row md:max-w-4xl">
        
        {/* Panel visual izquierdo (Oculto en móviles pequeños, visible en MD) */}
        <div className="flex flex-col justify-between p-10 text-white md:w-1/2 bg-emerald-800">
          <div>
            <div className="flex items-center gap-2 mb-8 text-2xl font-black tracking-tight">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
              GREEN<span className="text-emerald-300">CLUB</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight">Gestión de élite para tu club.</h2>
            <p className="text-sm text-emerald-100/80">Accede al portal para administrar reservas, inventario y socios con total seguridad y control de rutas.</p>
          </div>
          <div className="hidden mt-10 md:block">
            <div className="p-4 border backdrop-blur-sm rounded-2xl bg-white/10 border-white/20">
              <p className="text-xs font-medium text-emerald-50">Realizado por Alejandro Meneses Madrid</p>
            </div>
          </div>
        </div>

        {/* Formulario derecho */}
        <div className="flex flex-col justify-center p-10 md:w-1/2">
          <h3 className="mb-2 text-2xl font-bold text-slate-800">Iniciar Sesión</h3>
          <p className="mb-8 text-sm text-slate-500">Introduce tus credenciales para continuar.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700">Correo Electrónico</label>
              <input 
                {...register('email', { required: true })} 
                className="w-full px-4 py-3 transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white"
                placeholder="ejemplo@golf.com"
              />
              {errors.email && <span className="mt-1 text-xs font-medium text-red-500">El correo es obligatorio</span>}
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700">Contraseña</label>
              <input 
                type="password"
                {...register('password', { required: true })} 
                className="w-full px-4 py-3 transition-all border bg-slate-50 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full py-3.5 mt-2 font-bold text-white transition-all shadow-lg rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] shadow-emerald-600/30">
              Acceder al Panel
            </button>
          </form>
          
          <div className="pt-6 mt-8 text-xs text-center border-t border-slate-100 text-slate-400">
             <p>Recuerda: usa un correo con 'admin' para permisos totales.</p>
          </div>
        </div>
      </div>
    </div>
  );
};