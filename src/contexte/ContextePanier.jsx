import { createContext, useState, useEffect } from "react";
import { getPanier, sauvegarderPanier } from "../services/servicePanier";

export const ContextePanier = createContext();

export function ProviderPanier({ children }) {
  const [panier, setPanier] = useState(getPanier);

  useEffect(() => {
    sauvegarderPanier(panier);
  }, [panier]);

  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const existe = prev.find((p) => p.id === produit.id);
      if (existe) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const retirerDuPanier = (id) => {
    setPanier((prev) => prev.filter((p) => p.id !== id));
  };

  const viderPanier = () => setPanier([]);

  const totalArticles = panier.reduce((acc, p) => acc + p.quantite, 0);
  const totalPrix = panier.reduce((acc, p) => acc + p.price * p.quantite, 0);

  return (
    <ContextePanier.Provider
      value={{ panier, ajouterAuPanier, retirerDuPanier, viderPanier, totalArticles, totalPrix }}
    >
      {children}
    </ContextePanier.Provider>
  );
}