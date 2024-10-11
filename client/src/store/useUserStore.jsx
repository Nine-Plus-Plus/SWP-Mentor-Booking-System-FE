import { create } from 'zustand';

export const useUserStore = create(set => ({
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  current: localStorage.getItem('current') || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  userData: null,

  setModal: (token, role, current, isLoggedIn) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('current', current);
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    set(() => ({
      token,
      role,
      current,
      isLoggedIn
    }));
  },

  setUserData: userData => {
    set(() => ({
      userData
    }));
  },

  resetUserStore: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('current');
    localStorage.removeItem('isLoggedIn');
    set(() => ({
      token: null,
      role: null,
      current: null,
      isLoggedIn: false,
      userData: null
    }));
  }
}));
