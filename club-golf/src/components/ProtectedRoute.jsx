import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Si es un usuario intentando entrar a zona admin, lo mandamos a su panel
    return <Navigate to={role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return children;
};