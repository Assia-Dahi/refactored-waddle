export const getCommandes = () => {
  return JSON.parse(localStorage.getItem("commandes")) || [];
};

export const ajouterCommande = (commande) => {
  const commandes = getCommandes();
  commandes.push({
    ...commande,
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    statut: "en_cours",
  });
  localStorage.setItem("commandes", JSON.stringify(commandes));
};

export const annulerCommande = (id) => {
  const commandes = getCommandes();
  const mises = commandes.map((c) =>
    c.id === id ? { ...c, statut: "annulee" } : c
  );
  localStorage.setItem("commandes", JSON.stringify(mises));
};