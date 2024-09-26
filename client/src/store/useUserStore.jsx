
import { create } from 'zustand/index';

export const useUserStore = create((set) => ({
    token : localStorage.getItem('token') || null,
    role : localStorage.getItem('role') || null,
    current : localStorage.getItem('current') || null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
        
    setModal: (token, role, current, isLoggedIn) => {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        localStorage.setItem('current', current)
        localStorage.setItem('isLoggedIn', isLoggedIn)
        set(() => ({
            token,
            role,
            current,
            isLoggedIn,
        }))
    },
    
    // Action để reset store về trạng thái ban đầu
    resetUserStore: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('current')
        localStorage.removeItem('isLoggedIn')
        set(() => ({
            token: null,
            role: null,
            current: null,
            isLoggedIn: false,
        }))
    }
    
}));
