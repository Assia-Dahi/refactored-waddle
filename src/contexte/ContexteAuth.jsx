import { createContext, useState } from "react";

export const ContexteAuth = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(
    () => JSON.parse(localStorage.getItem("utilisateur")) || null
  );

  const login = ({ email, motDePasse }) => {
    const user = {
      nom: "Utilisateur",
      email: email,
    };
    setUtilisateur(user);
    localStorage.setItem("utilisateur", JSON.stringify(user));
  };

  const logout = () => {
    setUtilisateur(null);
    localStorage.removeItem("utilisateur");
  };

  // ✅ deconnecter = même chose que logout
  const deconnecter = logout;

  return (
    <ContexteAuth.Provider value={{ utilisateur, login, logout, deconnecter }}>
      {children}
    </ContexteAuth.Provider>
  );
}