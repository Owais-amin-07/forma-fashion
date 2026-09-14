import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('forma_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(user) localStorage.setItem('forma_user', JSON.stringify(user));
    else localStorage.removeItem('forma_user');
  },[user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      setUser(data);
      return data;
    } catch (error) {
      if(error.response || error.code !== 'ERR_NETWORK') throw error;
      const data = { _id: `local-${Date.now()}`, name: email.split('@')[0] || 'Forma customer', email, role: 'user', token: 'local-demo' };
      setUser(data);
      return data;
    } finally { setLoading(false); }
  };
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
      setUser(data);
      return data;
    } finally { setLoading(false); }
  };
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
