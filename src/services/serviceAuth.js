export const connexion = async (email, motDePasse) => {
  // Simulation locale (remplace par ton vrai backend)
  return new Promise((resolve, reject) => {
    if (email && motDePasse) {
      resolve({ id: 1, nom: "Utilisateur", email });
    } else {
      reject(new Error("Identifiants invalides"));
    }
  });
};

export const deconnexion = () => {
  localStorage.removeItem("utilisateur");
};