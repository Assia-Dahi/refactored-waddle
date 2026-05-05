import { useState } from "react";
import { useProduits } from "../hooks/useProduits";
import { usePanier } from "../hooks/usePanier";
import { Link } from "react-router-dom";

const couleur = "#3B5BDB";
const toDH = (euros) => `${(euros * 10.8).toFixed(2)} DH`;

export default function Catalogue() {
  const { produits, categories, chargement } = useProduits();
  const { ajouterAuPanier } = usePanier();
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("");

  const produitsFiltres = produits.filter((p) => {
    const matchRecherche = p.title.toLowerCase().includes(recherche.toLowerCase());
    const matchCategorie = categorie ? p.category === categorie : true;
    return matchRecherche && matchCategorie;
  });

  return (
    <div>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, borderRadius: "14px", padding: "28px 32px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>Notre Catalogue</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{produitsFiltres.length} produit(s) disponible(s)</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "9px 16px", width: "280px" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>🔍</span>
          <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un produit..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: "13px", width: "100%", fontFamily: "inherit" }} />
        </div>
      </div>

      {/* FILTRES */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        <button onClick={() => setCategorie("")} style={{ padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "inherit", background: categorie === "" ? couleur : "#EEF2FF", color: categorie === "" ? "white" : couleur }}>Tous</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategorie(cat)} style={{ padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "inherit", background: categorie === cat ? couleur : "#EEF2FF", color: categorie === cat ? "white" : couleur }}>{cat}</button>
        ))}
      </div>

      {/* GRILLE */}
      {chargement ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#868E96" }}>Chargement des produits...</div>
      ) : produitsFiltres.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#868E96" }}>Aucun produit trouvé pour « {recherche} »</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {produitsFiltres.map((p) => (
            <div key={p.id} style={{ background: "white", border: "0.5px solid #e9ecef", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = couleur; e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,91,219,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e9ecef"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <Link to={`/produit/${p.id}`}>
                <div style={{ background: "#f8f9fa", borderRadius: "10px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={p.image} alt={p.title} style={{ maxHeight: "130px", maxWidth: "100%", objectFit: "contain" }} />
                </div>
              </Link>
              <span style={{ fontSize: "11px", background: "#EEF2FF", color: couleur, padding: "3px 10px", borderRadius: "20px", fontWeight: 600, width: "fit-content" }}>{p.category}</span>
              <Link to={`/produit/${p.id}`} style={{ textDecoration: "none" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#212529", lineHeight: 1.45, margin: 0 }}>{p.title.length > 50 ? p.title.slice(0, 50) + "..." : p.title}</p>
              </Link>
              <p style={{ fontSize: "11px", color: "#868E96", lineHeight: 1.5, margin: 0 }}>{p.description?.slice(0, 60)}...</p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= Math.round(p.rating?.rate || 0) ? "#F59F00" : "#dee2e6", fontSize: "13px" }}>★</span>)}
                <span style={{ fontSize: "11px", color: "#adb5bd", marginLeft: "2px" }}>({p.rating?.count})</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <div>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: couleur }}>{toDH(p.price)}</span>
                  <span style={{ fontSize: "11px", color: "#adb5bd", textDecoration: "line-through", marginLeft: "6px" }}>{(p.price * 10.8 * 1.15).toFixed(2)} DH</span>
                </div>
                <button onClick={() => ajouterAuPanier(p)} style={{ background: couleur, color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Panier</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}