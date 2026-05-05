
import { fetchAPI } from "./api";

const traduireCategorie = (cat) => {
  const map = {
    "electronics": "Électronique",
    "jewelery": "Bijoux",
    "men's clothing": "Mode Homme",
    "women's clothing": "Mode Femme",
  };
  return map[cat] || cat;
};

const traduireProduit = (p) => ({
  ...p,
  title: titresFR[p.id] || p.title,
  description: descriptionsFR[p.id] || p.description,
  category: traduireCategorie(p.category),
  categorySlug: p.category,
});

const titresFR = {
  1:  "Veste en Coton Slim Fit",
  2:  "Manteau Casual Premium",
  3:  "Tee-shirt Homme Coton",
  4:  "Veste Outdoor Montagne",
  5:  "Bracelet Acier Femme",
  6:  "Bracelet Or Blanc Femme",
  7:  "Boucles d'oreilles Or",
  8:  "Bague Diamant Solitaire",
  9:  "Écran PC 4K Ultra HD",
  10: "SSD Externe 1To USB-C",
  11: "Casque Bluetooth Premium",
  12: "PC Portable Intel Core",
  13: "Robe Fleurie Femme",
  14: "Robe Élégante Soirée",
  15: "Tee-shirt Femme Col V",
  16: "Pull Femme Doux Hiver",
  17: "Sac à Dos USB Tech",
  18: "Montre Étanche Homme",
  19: "Disque Dur Externe 2To",
  20: "Écouteurs Sans Fil Pro",
};

const descriptionsFR = {
  1:  "Veste slim fit en coton de haute qualité, idéale pour un look décontracté élégant.",
  2:  "Manteau casual en laine mélangée, parfait pour les saisons froides.",
  3:  "Tee-shirt homme 100% coton, coupe droite, disponible en plusieurs couleurs.",
  4:  "Veste outdoor résistante au vent, idéale pour les randonnées et activités en plein air.",
  5:  "Bracelet en acier inoxydable pour femme, design moderne et élégant.",
  6:  "Bracelet en or blanc 18 carats, finition brillante, idéal comme cadeau.",
  7:  "Boucles d'oreilles en or véritable, design classique intemporel.",
  8:  "Bague solitaire avec diamant certifié, parfaite pour une demande en mariage.",
  9:  "Écran PC 4K Ultra HD 27 pouces, dalle IPS, idéal pour le gaming et la création.",
  10: "SSD externe ultra-rapide 1To, compatible USB-C, léger et portable.",
  11: "Casque Bluetooth avec réduction de bruit active, autonomie 30h.",
  12: "PC portable puissant avec processeur Intel Core i5, 8Go RAM, 512Go SSD.",
  13: "Robe fleurie légère pour femme, parfaite pour l'été et les occasions décontractées.",
  14: "Robe élégante pour soirée, coupe ajustée, tissu satiné de qualité.",
  15: "Tee-shirt femme col V, 100% coton doux, coupe flatteuse.",
  16: "Pull femme en laine douce, chaud et confortable pour l'hiver.",
  17: "Sac à dos avec port USB intégré, compartiments multiples, idéal pour les voyages.",
  18: "Montre homme étanche 50m, bracelet en cuir, mouvement automatique.",
  19: "Disque dur externe 2To, USB 3.0, compatible PC et Mac.",
  20: "Écouteurs true wireless avec réduction de bruit, autonomie 24h avec boîtier.",
};

export const getProduits = () =>
  fetchAPI("/products").then((data) => data.map(traduireProduit));

export const getProduitParId = (id) =>
  fetchAPI(`/products/${id}`).then(traduireProduit);

export const getCategories = () =>
  fetchAPI("/products/categories").then((cats) => cats.map(traduireCategorie));

export const getProduitsParCategorie = (cat) =>
  fetchAPI(`/products/category/${cat}`).then((data) => data.map(traduireProduit));