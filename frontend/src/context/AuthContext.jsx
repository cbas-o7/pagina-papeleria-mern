import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
/** 
/ Proveedor de contexto para la autenticación
*/

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Intenta cargar el usuario desde localStorage al iniciar
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Si el usuario cambia, actualiza localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Funciones para login/logout
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
