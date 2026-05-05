import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduitParId } from "../services/serviceProduits";
import { getAvis, ajouterAvis } from "../services/serviceAvis";
import { usePanier } from "../hooks/usePanier";
import { Link } from "react-router-dom";

const couleur = "#3B5BDB";

const convertirEnDirham = (euros) => (euros * 10.8).toFixed(2);

export default function DetailProduit() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [avis, setAvis] = useState([]);
  const [nouvelAvis, setNouvelAvis] = useState({ auteur: "", note: 5, commentaire: "" });
  const [imageActive, setImageActive] = useState(0);
  const [ajoute, setAjoute] = useState(false);
  const [quantite, setQuantite] = useState(1);
  const { ajouterAuPanier } = usePanier();

  useEffect(() => {
    getProduitParId(id).then(setProduit);
    setAvis(getAvis(id));
  }, [id]);

  const handleAjouter = () => {
    for (let i = 0; i < quantite; i++) ajouterAuPanier(produit);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 2000);
  };

  const soumettreAvis = () => {
    if (!nouvelAvis.auteur || !nouvelAvis.commentaire) return;
    ajouterAvis(id, nouvelAvis);
    setAvis(getAvis(id));
    setNouvelAvis({ auteur: "", note: 5, commentaire: "" });
  };

  if (!produit) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#868E96" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px" }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      Chargement...
    </div>
  );

  const prixDirham = convertirEnDirham(produit.price);

  // Images simulées (même image en différentes tailles pour l'effet galerie)
  const images = [produit.image, produit.image, produit.image];

  return (
    <div>

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, borderRadius: "14px", padding: "18px 28px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/catalogue" style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Catalogue</Link>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>›</span>
        <span style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>{produit.title?.slice(0, 40)}...</span>
      </div>

      {/* ── CORPS PRINCIPAL ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "32px" }}>

        {/* ── GALERIE IMAGES ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Image principale */}
          <div style={{ background: "white", borderRadius: "16px", border: "0.5px solid #e9ecef", padding: "32px", display: "flex", alignItems: "center", justifyContent: "center", height: "340px" }}>
            <img
              src={images[imageActive]}
              alt={produit.title}
              style={{ maxHeight: "280px", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Miniatures */}
          <div style={{ display: "flex", gap: "10px" }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageActive(i)}
                style={{
                  width: "72px", height: "72px",
                  background: "white",
                  border: imageActive === i ? `2px solid ${couleur}` : "1.5px solid #e9ecef",
                  borderRadius: "10px",
                  padding: "6px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <img src={img} alt="" style={{ maxWidth: "56px", maxHeight: "56px", objectFit: "contain" }} />
              </button>
            ))}
          </div>
        </div>

        {/* ── INFOS PRODUIT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Badge catégorie */}
          <span style={{ fontSize: "12px", background: "#EEF2FF", color: couleur, padding: "4px 12px", borderRadius: "20px", fontWeight: 600, width: "fit-content" }}>
            {produit.category}
          </span>

          {/* Titre */}
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#212529", lineHeight: 1.3, margin: 0 }}>
            {produit.title}
          </h1>

          {/* Étoiles + avis */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map((i) => (
                <span key={i} style={{ fontSize: "20px", color: i <= Math.round(produit.rating?.rate || 0) ? "#F59F00" : "#dee2e6" }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: "14px", color: "#868E96" }}>
              {produit.rating?.rate} ({produit.rating?.count} avis)
            </span>
          </div>

          {/* PRIX EN DIRHAM */}
          <div style={{ background: "#EEF2FF", borderRadius: "12px", padding: "16px 20px" }}>
            <p style={{ fontSize: "13px", color: "#868E96", margin: "0 0 4px" }}>Prix</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: couleur }}>
                {prixDirham} DH
              </span>
              <span style={{ fontSize: "14px", color: "#adb5bd", textDecoration: "line-through" }}>
                {(parseFloat(prixDirham) * 1.15).toFixed(2)} DH
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "#0CA678", fontWeight: 600, margin: "4px 0 0" }}>
              Livraison gratuite dès 500 DH
            </p>
          </div>

          {/* Description */}
          <p style={{ fontSize: "14px", color: "#495057", lineHeight: 1.7, margin: 0 }}>
            {produit.description}
          </p>

          {/* Quantité */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#495057" }}>Quantité :</span>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e9ecef", borderRadius: "8px", overflow: "hidden" }}>
              <button
                onClick={() => setQuantite(q => Math.max(1, q - 1))}
                style={{ width: "36px", height: "36px", background: "#f8f9fa", border: "none", cursor: "pointer", fontSize: "18px", color: "#495057", fontWeight: 700 }}
              >
                −
              </button>
              <span style={{ width: "40px", textAlign: "center", fontSize: "14px", fontWeight: 700, color: "#212529" }}>
                {quantite}
              </span>
              <button
                onClick={() => setQuantite(q => q + 1)}
                style={{ width: "36px", height: "36px", background: "#f8f9fa", border: "none", cursor: "pointer", fontSize: "18px", color: "#495057", fontWeight: 700 }}
              >
                +
              </button>
            </div>
          </div>

          {/* ── BOUTON AJOUTER AU PANIER BLEU ── */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleAjouter}
              style={{
                flex: 1,
                background: ajoute
                  ? "#0CA678"
                  : `linear-gradient(135deg, ${couleur}, #4C6EF5)`,
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "15px 24px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: ajoute
                  ? "0 6px 20px rgba(12,166,120,0.35)"
                  : "0 6px 20px rgba(59,91,219,0.35)",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {/* Vraie image panier */}
              <img
                src={ajoute
                  ? "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=30&q=80"
                  : "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=30&q=80"
                }
                alt=""
                style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
              />
              {ajoute ? "Ajouté au panier ✓" : "Ajouter au panier"}
            </button>

            {/* Bouton favoris */}
            <button style={{ width: "52px", height: "52px", background: "white", border: "1.5px solid #e9ecef", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=40&q=80"
                alt="favoris"
                style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", opacity: 0.6 }}
              />
            </button>
          </div>

          {/* Badges garanties */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { label: "Livraison 24h",    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=40&q=80" },
              { label: "Retour gratuit",   image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=40&q=80" },
              { label: "Paiement sécurisé",image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&q=80" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", background: "#f8f9fa", borderRadius: "10px", padding: "10px 8px", textAlign: "center" }}>
                <img src={b.image} alt={b.label} style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#495057" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AVIS CLIENTS ── */}
      <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>

        <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "18px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&q=80"
            alt=""
            style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover" }}
          />
          <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0 }}>
            Avis clients ({avis.length})
          </h2>
        </div>

        <div style={{ padding: "24px" }}>

          {/* Liste avis */}
          {avis.length === 0 ? (
            <p style={{ color: "#868E96", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>
              Aucun avis pour ce produit. Soyez le premier !
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {avis.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", padding: "16px", background: "#f8f9fa", borderRadius: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=42&q=80`}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = `<span style="font-size:16px;font-weight:700;color:#3B5BDB">${a.auteur?.charAt(0).toUpperCase()}</span>`; }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#212529" }}>{a.auteur}</span>
                      <div style={{ display: "flex", gap: "1px" }}>
                        {[1,2,3,4,5].map(s => (
                          <span key={s} style={{ fontSize: "13px", color: s <= a.note ? "#F59F00" : "#dee2e6" }}>★</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "#495057", margin: 0, lineHeight: 1.6 }}>{a.commentaire}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire avis */}
          <div style={{ borderTop: "0.5px solid #e9ecef", paddingTop: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#212529", marginBottom: "16px" }}>
              Laisser un avis
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                placeholder="Votre nom"
                value={nouvelAvis.auteur}
                onChange={e => setNouvelAvis({ ...nouvelAvis, auteur: e.target.value })}
                style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = couleur}
                onBlur={e => e.target.style.borderColor = "#dee2e6"}
              />

              {/* Sélection note avec étoiles */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#495057", fontWeight: 600 }}>Note :</span>
                {[1,2,3,4,5].map(s => (
                  <button
                    key={s}
                    onClick={() => setNouvelAvis({ ...nouvelAvis, note: s })}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: s <= nouvelAvis.note ? "#F59F00" : "#dee2e6", padding: "0 2px" }}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Votre commentaire..."
                value={nouvelAvis.commentaire}
                onChange={e => setNouvelAvis({ ...nouvelAvis, commentaire: e.target.value })}
                rows={3}
                style={{ padding: "10px 14px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = couleur}
                onBlur={e => e.target.style.borderColor = "#dee2e6"}
              />

              <button
                onClick={soumettreAvis}
                style={{
                  background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`,
                  color: "white", border: "none", borderRadius: "8px",
                  padding: "12px 24px", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit", width: "fit-content",
                  boxShadow: "0 4px 14px rgba(59,91,219,0.3)",
                }}
              >
                Envoyer mon avis →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}