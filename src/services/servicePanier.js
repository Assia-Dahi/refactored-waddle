export const getPanier = () => {
  return JSON.parse(localStorage.getItem("panier")) || [];
};

export const sauvegarderPanier = (panier) => {
  localStorage.setItem("panier", JSON.stringify(panier));
};