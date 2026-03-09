
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  
  login: (userData, role, token) => {
    localStorage.setItem('golf_token', token);
    set({ user: userData, role: role, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('golf_token');
    set({ user: null, role: null, isAuthenticated: false });
  }
}));