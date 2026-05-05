import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProduits } from "../services/serviceProduits";
import { usePanier } from "../hooks/usePanier";

const couleur = "#3B5BDB";
const toDH = (euros) => `${(euros * 10.8).toFixed(2)} DH`;

const categories = [
  { nom: "Electronique", slug: "electronics",     image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80" },
  { nom: "Bijoux",       slug: "jewelery",         image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80" },
  { nom: "Mode Homme",   slug: "men's clothing",   image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&q=80" },
  { nom: "Mode Femme",   slug: "women's clothing", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
];

const stats = [
  { valeur: "500+", label: "Produits disponibles", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&q=80", bg: "#EEF2FF", color: couleur },
  { valeur: "4",    label: "Catégories",            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=80&q=80", bg: "#E6FCF5", color: "#0CA678" },
  { valeur: "24h",  label: "Livraison rapide",      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=80&q=80", bg: "#FFF9DB", color: "#F08C00" },
  { valeur: "100%", label: "Paiement sécurisé",     image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&q=80", bg: "#FFF5F5", color: "#E03131" },
];

export default function Accueil() {
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const { ajouterAuPanier } = usePanier();
  const navigate = useNavigate();

  useEffect(() => {
    getProduits()
      .then((data) => setProduits(data.slice(0, 8)))
      .finally(() => setChargement(false));
  }, []);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* HERO */}
      <div style={{ background: `linear-gradient(135deg, ${couleur} 0%, #4C6EF5 60%, #748FFC 100%)`, borderRadius: "16px", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", width: "200px", height: "200px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", top: "-60px", right: "200px" }} />
        <div style={{ position: "absolute", width: "140px", height: "140px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", bottom: "-40px", right: "80px" }} />
        <div style={{ zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginBottom: "8px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Bienvenue sur E-Store</p>
          <h1 style={{ color: "white", fontSize: "32px", fontWeight: 700, lineHeight: 1.25, marginBottom: "12px", maxWidth: "420px" }}>Des milliers de produits au meilleur prix</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "24px", maxWidth: "380px" }}>Électronique, mode, bijoux et plus encore — livraison gratuite dès 500 DH.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link to="/catalogue">
              <button style={{ background: "white", color: couleur, fontWeight: 700, fontSize: "14px", padding: "11px 24px", borderRadius: "8px", border: "none", cursor: "pointer" }}>Voir le catalogue →</button>
            </Link>
            <Link to="/inscription">
              <button style={{ background: "rgba(255,255,255,0.15)", color: "white", fontWeight: 600, fontSize: "14px", padding: "11px 24px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>S'inscrire</button>
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", gap: "14px", zIndex: 1 }}>
          {heroImages.map((src, i) => (
            <div key={i} style={{ width: "90px", height: "90px", borderRadius: "16px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.3)", transform: i === 1 ? "translateY(-12px)" : "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "32px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: "12px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <img src={s.image} alt={s.label} style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: s.color }}>{s.valeur}</div>
              <div style={{ fontSize: "12px", color: "#868E96" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CATÉGORIES */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#212529" }}>Catégories populaires</h2>
          <Link to="/catalogue" style={{ fontSize: "13px", color: couleur, fontWeight: 600 }}>Voir tout →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {categories.map((cat) => (
            <button key={cat.slug} onClick={() => navigate(`/catalogue?categorie=${encodeURIComponent(cat.slug)}`)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", borderRadius: "14px", overflow: "hidden", position: "relative", height: "140px", display: "block", width: "100%" }}
              onMouseEnter={e => e.currentTarget.querySelector(".overlay").style.background = "rgba(59,91,219,0.55)"}
              onMouseLeave={e => e.currentTarget.querySelector(".overlay").style.background = "rgba(0,0,0,0.35)"}
            >
              <img src={cat.image} alt={cat.nom} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "15px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{cat.nom}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* PRODUITS EN VEDETTE */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#212529" }}>Produits en vedette</h2>
          <Link to="/catalogue" style={{ fontSize: "13px", color: couleur, fontWeight: 600 }}>Voir tout →</Link>
        </div>
        {chargement ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#868E96" }}>Chargement...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {produits.map((p) => (
              <div key={p.id} style={{ background: "white", border: "0.5px solid #e9ecef", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = couleur}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e9ecef"}
              >
                <Link to={`/produit/${p.id}`}>
                  <div style={{ background: "#f8f9fa", borderRadius: "8px", height: "130px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={p.image} alt={p.title} style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                </Link>
                <span style={{ fontSize: "11px", background: "#EEF2FF", color: couleur, padding: "2px 8px", borderRadius: "20px", fontWeight: 600, width: "fit-content", textTransform: "capitalize" }}>{p.category}</span>
                <Link to={`/produit/${p.id}`}>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#212529", lineHeight: 1.4, margin: 0 }}>{p.title.length > 45 ? p.title.slice(0, 45) + "..." : p.title}</p>
                </Link>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= Math.round(p.rating?.rate || 0) ? "#F59F00" : "#dee2e6", fontSize: "13px" }}>★</span>)}
                  <span style={{ fontSize: "11px", color: "#adb5bd" }}>({p.rating?.count})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: couleur }}>{toDH(p.price)}</span>
                  <button onClick={() => ajouterAuPanier(p)} style={{ background: couleur, color: "white", border: "none", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Panier</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BANNIÈRE BAS */}
      <div style={{ background: "linear-gradient(135deg, #212529, #343A40)", borderRadius: "14px", padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>Livraison gratuite dès 500 DH</h3>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>Commandez maintenant et recevez vos articles en 24h</p>
        </div>
        <Link to="/catalogue">
          <button style={{ background: couleur, color: "white", fontWeight: 700, fontSize: "14px", padding: "12px 28px", borderRadius: "8px", border: "none", cursor: "pointer" }}>Commander maintenant →</button>
        </Link>
      </div>

    </div>
  );
}