import { useState } from "react";
import { usePanier } from "../hooks/usePanier";
import { useAuth } from "../hooks/useAuth";
import { ajouterCommande } from "../services/serviceCommandes";
import { useNavigate, Link } from "react-router-dom";

const couleur = "#3B5BDB";
const toDH = (euros) => `${(euros * 10.8).toFixed(2)} DH`;

const LogoVisa = () => (
  <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
    <rect width="50" height="32" rx="5" fill="#1A1F71"/>
    <text x="8" y="22" fontFamily="Arial" fontWeight="900" fontSize="16" fill="white" letterSpacing="-0.5">VISA</text>
  </svg>
);

const LogoMastercard = () => (
  <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
    <rect width="50" height="32" rx="5" fill="#252525"/>
    <circle cx="19" cy="16" r="10" fill="#EB001B"/>
    <circle cx="31" cy="16" r="10" fill="#F79E1B"/>
    <path d="M25 8.268a10 10 0 010 15.464A10 10 0 0125 8.268z" fill="#FF5F00"/>
  </svg>
);

const LogoPaypal = () => (
  <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
    <rect width="50" height="32" rx="5" fill="#F5F5F5" stroke="#e0e0e0" strokeWidth="0.5"/>
    <path d="M18 8h7c3 0 5 1.5 4.5 5C29 16.5 26.5 18 24 18h-2l-1 6h-3L18 8z" fill="#003087"/>
    <path d="M21 10h7c3 0 5 1.5 4.5 5C32 18.5 29.5 20 27 20h-2l-1 4h-3L21 10z" fill="#009CDE"/>
  </svg>
);

const LogoVirement = () => (
  <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
    <rect width="50" height="32" rx="5" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.5"/>
    <rect x="8" y="9" width="34" height="14" rx="2" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
    <rect x="8" y="13" width="34" height="3" fill="#2E7D32"/>
    <rect x="11" y="18" width="10" height="2" rx="1" fill="#2E7D32"/>
    <rect x="30" y="18" width="8" height="2" rx="1" fill="#2E7D32"/>
  </svg>
);

const LogoCash = () => (
  <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
    <rect width="50" height="32" rx="5" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="0.5"/>
    <rect x="7" y="9" width="36" height="14" rx="2" fill="none" stroke="#F57F17" strokeWidth="1.5"/>
    <circle cx="25" cy="16" r="4.5" fill="none" stroke="#F57F17" strokeWidth="1.5"/>
    <text x="22.5" y="19.5" fontFamily="Arial" fontWeight="900" fontSize="8" fill="#F57F17">$</text>
    <rect x="7" y="12" width="5" height="2" rx="0.5" fill="#F57F17"/>
    <rect x="38" y="18" width="5" height="2" rx="0.5" fill="#F57F17"/>
  </svg>
);

const IconAdresse = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPaiementHeader = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const IconDelete = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>
);

const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconSuccess = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0CA678" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const IconPanierVide = () => (
  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconCamion = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F08C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const IconSecurise = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#adb5bd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const MODES_PAIEMENT = [
  {
    id: "visa",
    label: "Carte Visa / Mastercard",
    description: "Paiement sécurisé par carte",
    Logo: () => (
      <div style={{ display: "flex", gap: "4px" }}>
        <LogoVisa /><LogoMastercard />
      </div>
    ),
  },
  { id: "paypal",    label: "PayPal",                  description: "Payer via votre compte PayPal",    Logo: LogoPaypal },
  { id: "virement",  label: "Virement bancaire",        description: "Depuis votre banque directement",  Logo: LogoVirement },
  { id: "livraison", label: "Paiement à la livraison",  description: "Payer en cash à la réception",     Logo: LogoCash },
];

export default function Panier() {
  const { panier, retirerDuPanier, viderPanier, totalPrix } = usePanier();
  const { utilisateur } = useAuth();
  const navigate = useNavigate();

  const [modePaiement, setModePaiement] = useState("visa");
  const [commande, setCommande] = useState(false);
  const [adresse, setAdresse] = useState({
    prenom: utilisateur?.nom || "",
    email: utilisateur?.email || "",
    telephone: "", adresse: "", ville: "", pays: "Maroc",
  });

  const fraisLivraison = totalPrix >= 500 ? 0 : 29.99;
  const totalFinal = totalPrix + fraisLivraison;

  const confirmerCommande = () => {
    ajouterCommande({ articles: panier, total: totalFinal, adresse, modePaiement });
    viderPanier();
    setCommande(true);
  };

  if (commande) {
    return (
      <div style={{ maxWidth: "500px", margin: "60px auto", textAlign: "center", padding: "40px", background: "white", borderRadius: "16px", border: "0.5px solid #e9ecef" }}>
        <div style={{ width: "80px", height: "80px", background: "#E6FCF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <IconSuccess />
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#212529", marginBottom: "10px" }}>Commande confirmée !</h2>
        <p style={{ color: "#868E96", fontSize: "14px", marginBottom: "28px" }}>Merci {adresse.prenom} ! Votre commande a été passée avec succès.</p>
        <div style={{ background: "#EEF2FF", borderRadius: "10px", padding: "16px", marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", color: "#495057", marginBottom: "4px" }}>Total payé</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: couleur }}>{toDH(totalFinal)}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={() => navigate("/mes-commandes")} style={{ background: couleur, color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>Voir mes commandes</button>
          <button onClick={() => navigate("/")} style={{ background: "#EEF2FF", color: couleur, border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>Retour accueil</button>
        </div>
      </div>
    );
  }

  if (panier.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ width: "140px", height: "140px", borderRadius: "50%", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <IconPanierVide />
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#212529", marginBottom: "10px" }}>Votre panier est vide</h2>
        <p style={{ color: "#868E96", fontSize: "14px", marginBottom: "24px" }}>Ajoutez des produits pour commencer vos achats</p>
        <Link to="/catalogue">
          <button style={{ background: couleur, color: "white", border: "none", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>Voir le catalogue →</button>
        </Link>
      </div>
    );
  }

  const modeActif = MODES_PAIEMENT.find(m => m.id === modePaiement);

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, borderRadius: "14px", padding: "24px 32px", marginBottom: "28px" }}>
        <h1 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>Mon Panier</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{panier.length} article(s)</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* ARTICLES */}
          <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "0.5px solid #e9ecef", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#212529", margin: 0 }}>Articles</h2>
              <button onClick={viderPanier} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFF5F5", color: "#E03131", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600, fontFamily: "inherit" }}>
                <IconDelete /> Vider le panier
              </button>
            </div>
            {panier.map((article, i) => (
              <div key={article.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderBottom: i < panier.length - 1 ? "0.5px solid #f1f3f5" : "none" }}>
                <div style={{ width: "70px", height: "70px", background: "#f8f9fa", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={article.image} alt={article.title} style={{ maxWidth: "60px", maxHeight: "60px", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#212529", marginBottom: "4px" }}>{article.title?.slice(0, 45)}...</p>
                  <span style={{ fontSize: "11px", background: "#EEF2FF", color: couleur, padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}>{article.category}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#868E96" }}>{toDH(article.price)} × {article.quantite}</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: couleur, minWidth: "90px", textAlign: "right" }}>{toDH(article.price * article.quantite)}</span>
                  <button onClick={() => retirerDuPanier(article.id)} style={{ background: "#FFF5F5", color: "#E03131", border: "none", width: "32px", height: "32px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ADRESSE */}
          <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "0.5px solid #e9ecef", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", background: "#EEF2FF", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconAdresse />
              </div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#212529", margin: 0 }}>Adresse de livraison</h2>
            </div>
            <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { key: "prenom", label: "Prénom", placeholder: "Votre prénom" },
                { key: "email", label: "Email", placeholder: "votre@email.com" },
                { key: "telephone", label: "Téléphone", placeholder: "06 12 34 56 78" },
                { key: "ville", label: "Ville", placeholder: "Casablanca" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>{label}</label>
                  <input value={adresse[key]} onChange={e => setAdresse({ ...adresse, [key]: e.target.value })} placeholder={placeholder}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = couleur} onBlur={e => e.target.style.borderColor = "#dee2e6"} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>Adresse complète</label>
                <input value={adresse.adresse} onChange={e => setAdresse({ ...adresse, adresse: e.target.value })} placeholder="123 Rue Mohammed V"
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = couleur} onBlur={e => e.target.style.borderColor = "#dee2e6"} />
              </div>
            </div>
          </div>

          {/* PAIEMENT */}
          <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "0.5px solid #e9ecef", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", background: "#EEF2FF", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconPaiementHeader />
              </div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#212529", margin: 0 }}>Mode de paiement</h2>
            </div>
            <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {MODES_PAIEMENT.map((mode) => {
                const actif = modePaiement === mode.id;
                return (
                  <button key={mode.id} onClick={() => setModePaiement(mode.id)} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px", borderRadius: "12px", cursor: "pointer", border: actif ? `2px solid ${couleur}` : "1.5px solid #e9ecef", background: actif ? "#EEF2FF" : "white", textAlign: "left", fontFamily: "inherit", transition: "all 0.15s", position: "relative" }}>
                    {actif && (
                      <div style={{ position: "absolute", top: "10px", right: "10px", width: "18px", height: "18px", background: couleur, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconCheck />
                      </div>
                    )}
                    <mode.Logo />
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: actif ? couleur : "#212529", margin: "0 0 2px" }}>{mode.label}</p>
                      <p style={{ fontSize: "11px", color: "#868E96", margin: 0 }}>{mode.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            {modePaiement === "visa" && (
              <div style={{ margin: "0 20px 20px", padding: "16px", background: "#f8f9fa", borderRadius: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <LogoVisa /><LogoMastercard />
                  <span style={{ fontSize: "11px", color: "#868E96", marginLeft: "4px" }}>Paiement sécurisé SSL 🔒</span>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>Numéro de carte</label>
                  <input placeholder="1234  5678  9012  3456" style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", letterSpacing: "1px" }}
                    onFocus={e => e.target.style.borderColor = couleur} onBlur={e => e.target.style.borderColor = "#dee2e6"} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>Date d'expiration</label>
                  <input placeholder="MM / AA" style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = couleur} onBlur={e => e.target.style.borderColor = "#dee2e6"} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>CVV</label>
                  <input placeholder="•••" type="password" maxLength={4} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #dee2e6", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = couleur} onBlur={e => e.target.style.borderColor = "#dee2e6"} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden", position: "sticky", top: "80px" }}>
          <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "20px" }}>
            <h2 style={{ color: "white", fontSize: "16px", fontWeight: 700, margin: "0 0 16px" }}>Récapitulatif</h2>
            {panier.map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "40px", height: "40px", background: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={a.image} alt={a.title} style={{ maxWidth: "34px", maxHeight: "34px", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", margin: "0 0 2px", fontWeight: 500 }}>{a.title?.slice(0, 28)}...</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", margin: 0 }}>{toDH(a.price)} × {a.quantite}</p>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>{toDH(a.price * a.quantite)}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#212529", margin: "0 0 1px" }}>Livraison rapide</p>
                <p style={{ fontSize: "11px", color: "#868E96", margin: 0 }}>Partout au Maroc en 24–48h</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#868E96" }}>
              <span>Sous-total</span><span>{toDH(totalPrix)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#868E96" }}>
              <span>Livraison</span>
              <span style={{ color: fraisLivraison === 0 ? "#0CA678" : "#868E96", fontWeight: fraisLivraison === 0 ? 700 : 400 }}>
                {fraisLivraison === 0 ? "✓ Gratuite" : toDH(fraisLivraison)}
              </span>
            </div>
            {fraisLivraison > 0 && (
              <div style={{ background: "#FFF9DB", borderRadius: "8px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <IconCamion />
                <span style={{ fontSize: "11px", color: "#F08C00", fontWeight: 500 }}>
                  Ajoutez {((500 - totalPrix) * 10.8).toFixed(2)} DH pour la livraison gratuite
                </span>
              </div>
            )}
            <div style={{ height: "0.5px", background: "#e9ecef" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#EEF2FF", borderRadius: "10px", padding: "14px 16px" }}>
              <span style={{ fontSize: "15px", fontWeight: 700, color: "#212529" }}>Total</span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: couleur }}>{toDH(totalFinal)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8f9fa", borderRadius: "8px", padding: "10px 14px" }}>
              {modeActif && <modeActif.Logo />}
              <div>
                <p style={{ fontSize: "11px", color: "#868E96", margin: "0 0 2px" }}>Mode de paiement</p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: couleur, margin: 0 }}>{modeActif?.label}</p>
              </div>
            </div>
            <button onClick={confirmerCommande}
              style={{ background: `linear-gradient(135deg, ${couleur} 0%, #4C6EF5 100%)`, color: "white", border: "none", borderRadius: "10px", padding: "16px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(59,91,219,0.35)", letterSpacing: "0.3px" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,91,219,0.5)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,91,219,0.35)"}>
              Confirmer la commande →
            </button>
            <Link to="/catalogue" style={{ textAlign: "center", fontSize: "13px", color: "#868E96", display: "block" }}>← Continuer mes achats</Link>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap", paddingTop: "4px" }}>
              <IconSecurise />
              <span style={{ fontSize: "11px", color: "#adb5bd" }}>Paiement sécurisé</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <LogoVisa /><LogoMastercard /><LogoPaypal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}