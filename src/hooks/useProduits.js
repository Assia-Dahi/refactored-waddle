import { useState, useEffect } from "react";
import { getProduits, getCategories } from "../services/serviceProduits";

export function useProduits() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    Promise.all([getProduits(), getCategories()])
      .then(([prods, cats]) => {
        setProduits(prods);
        setCategories(cats);
      })
      .finally(() => setChargement(false));
  }, []);

  return { produits, categories, chargement };
}
