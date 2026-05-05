import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getCommandes } from "../services/serviceCommandes";

const couleur = "#3B5BDB";
const toDH = (euros) => `${(euros * 10.8).toFixed(2)} DH`;

export default function Profil() {
  const { utilisateur, deconnecter } = useAuth();
  const navigate = useNavigate();
  const commandes = getCommandes();
  const [onglet, setOnglet] = useState("profil");
  const [form, setForm] = useState({
    nom: utilisateur?.nom || "",
    email: utilisateur?.email || "",
    telephone: "",
    adresse: "",
    ville: "Casablanca",
    pays: "Maroc",
  });
  const [sauvegarde, setSauvegarde] = useState(false);

  if (!utilisateur) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ width: "140px", height: "140px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 24px" }}>
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#212529", marginBottom: "10px" }}>Vous n'êtes pas connecté</h2>
        <p style={{ color: "#868E96", fontSize: "14px", marginBottom: "24px" }}>Connectez-vous pour accéder à votre profil</p>
        <Link to="/connexion">
          <button style={{ background: couleur, color: "white", border: "none", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>
            Se connecter →
          </button>
        </Link>
      </div>
    );
  }

  const initiales = utilisateur.nom?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const totalDepense = commandes.reduce((acc, c) => acc + (c.total || 0), 0);
  const commandesActives = commandes.filter(c => c.statut !== "annulee").length;

  const handleSauvegarder = () => {
    setSauvegarde(true);
    setTimeout(() => setSauvegarde(false), 2000);
  };

  const handleDeconnexion = () => {
    deconnecter();
    navigate("/");
  };

  return (
    <div>

      {/* ── HEADER PROFIL ── */}
      <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, borderRadius: "16px", padding: "32px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "200px", height: "200px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", top: "-80px", right: "100px" }} />
        <div style={{ position: "absolute", width: "140px", height: "140px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", bottom: "-60px", right: "300px" }} />

        {/* Avatar */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "white", flexShrink: 0, zIndex: 1 }}>
          {initiales}
        </div>

        <div style={{ zIndex: 1 }}>
          <h1 style={{ color: "white", fontSize: "22px", fontWeight: 700, margin: "0 0 4px" }}>{utilisateur.nom}</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", margin: "0 0 12px" }}>{utilisateur.email}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "6px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=20&q=80" alt="" style={{ width: "16px", height: "16px", borderRadius: "3px", objectFit: "cover" }} />
              <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>{commandes.length} commandes</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "6px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=20&q=80" alt="" style={{ width: "16px", height: "16px", borderRadius: "3px", objectFit: "cover" }} />
              <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>{toDH(totalDepense)} dépensés</span>
            </div>
          </div>
        </div>

        {/* Bouton déconnexion */}
        <button
          onClick={handleDeconnexion}
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "10px", padding: "10px 18px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600, zIndex: 1 }}
        >
          <img src="https://images.unsplash.com/photo-1605792657660-596af9009e82?w=20&q=80" alt="" style={{ width: "18px", height: "18px", borderRadius: "3px", objectFit: "cover" }} />
          Se déconnecter
        </button>
      </div>

      {/* ── STATS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "28px" }}>
        {[
          { valeur: commandes.length,        label: "Total commandes",   image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=40&q=80", bg: "#EEF2FF", color: couleur },
          { valeur: commandesActives,         label: "Commandes actives", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=40&q=80", bg: "#E6FCF5", color: "#0CA678" },
          { valeur: toDH(totalDepense),       label: "Total dépensé",     image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&q=80", bg: "#FFF9DB", color: "#F08C00" },
          { valeur: commandes.filter(c => c.statut === "annulee").length, label: "Annulées", image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=40&q=80", bg: "#FFF5F5", color: "#E03131" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: "12px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={s.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: s.color }}>{s.valeur}</div>
              <div style={{ fontSize: "11px", color: "#868E96" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── ONGLETS ── */}
      <div style={{ display: "flex", gap: "4px", background: "#f8f9fa", borderRadius: "12px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
        {[
          { id: "profil",    label: "Mon profil",    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=20&q=80" },
          { id: "commandes", label: "Mes commandes", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=20&q=80" },
          { id: "adresse",   label: "Adresses",      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=20&q=80" },
          { id: "securite",  label: "Sécurité",      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=20&q=80" },
        ].map(o => (
          <button key={o.id} onClick={() => setOnglet(o.id)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 18px", borderRadius: "10px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600, background: onglet === o.id ? "white" : "transparent", color: onglet === o.id ? couleur : "#868E96", boxShadow: onglet === o.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            <img src={o.image} alt="" style={{ width: "18px", height: "18px", borderRadius: "4px", objectFit: "cover" }} />
            {o.label}
          </button>
        ))}
      </div>

      {/* ── CONTENU ONGLETS ── */}

      {/* MON PROFIL */}
      {onglet === "profil" && (
        <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&q=80" alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0 }}>Informations personnelles</h2>
          </div>
          <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { key: "nom",       label: "Nom complet",  placeholder: "Votre nom" },
              { key: "email",     label: "Email",         placeholder: "votre@email.com" },
              { key: "telephone", label: "Téléphone",     placeholder: "06 12 34 56 78" },
              { key: "ville",     label: "Ville",         placeholder: "Casablanca" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "8px" }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #e9ecef", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = couleur}
                  onBlur={e => e.target.style.borderColor = "#e9ecef"}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "8px" }}>Adresse</label>
              <input
                value={form.adresse}
                onChange={e => setForm({ ...form, adresse: e.target.value })}
                placeholder="123 Rue Mohammed V"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #e9ecef", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = couleur}
                onBlur={e => e.target.style.borderColor = "#e9ecef"}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={handleSauvegarder} style={{ background: sauvegarde ? "#0CA678" : `linear-gradient(135deg, ${couleur}, #4C6EF5)`, color: "white", border: "none", borderRadius: "10px", padding: "12px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(59,91,219,0.3)", transition: "background 0.3s" }}>
                {sauvegarde ? "Sauvegardé ✓" : "Sauvegarder les modifications"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MES COMMANDES */}
      {onglet === "commandes" && (
        <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=40&q=80" alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0 }}>Mes dernières commandes</h2>
          </div>
          <div style={{ padding: "20px" }}>
            {commandes.length === 0 ? (
              <p style={{ textAlign: "center", color: "#868E96", padding: "40px 0" }}>Aucune commande</p>
            ) : (
              [...commandes].reverse().slice(0, 5).map((cmd, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0", borderBottom: i < 4 ? "0.5px solid #f1f3f5" : "none" }}>
                  <div style={{ width: "44px", height: "44px", background: "#f8f9fa", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {cmd.articles?.[0]?.image && <img src={cmd.articles[0].image} alt="" style={{ maxWidth: "38px", maxHeight: "38px", objectFit: "contain" }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#212529", margin: "0 0 3px" }}>Commande #{String(cmd.id).slice(-4)}</p>
                    <p style={{ fontSize: "11px", color: "#868E96", margin: 0 }}>📅 {cmd.date} · {cmd.articles?.length} article(s)</p>
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: couleur }}>{toDH(cmd.total)}</span>
                </div>
              ))
            )}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Link to="/mes-commandes">
                <button style={{ background: "#EEF2FF", color: couleur, border: "none", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", fontFamily: "inherit" }}>
                  Voir toutes mes commandes →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ADRESSES */}
      {onglet === "adresse" && (
        <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=40&q=80" alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0 }}>Mes adresses</h2>
          </div>
          <div style={{ padding: "28px" }}>
            <div style={{ border: `2px solid ${couleur}`, borderRadius: "12px", padding: "20px", marginBottom: "16px", position: "relative" }}>
              <div style={{ position: "absolute", top: "12px", right: "12px", background: "#EEF2FF", color: couleur, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>Par défaut</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=40&q=80" alt="" style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#212529", margin: 0 }}>{utilisateur.nom}</p>
                  <p style={{ fontSize: "12px", color: "#868E96", margin: 0 }}>Domicile</p>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#495057", margin: 0 }}>Casablanca, Maroc</p>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", border: "1.5px dashed #e9ecef", borderRadius: "12px", background: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: couleur, fontFamily: "inherit", width: "100%" }}>
              <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=20&q=80" alt="" style={{ width: "20px", height: "20px", borderRadius: "4px", objectFit: "cover" }} />
              + Ajouter une nouvelle adresse
            </button>
          </div>
        </div>
      )}

      {/* SÉCURITÉ */}
      {onglet === "securite" && (
        <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=40&q=80" alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0 }}>Sécurité du compte</h2>
          </div>
          <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Changer le mot de passe",       desc: "Dernière modification il y a 30 jours", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=40&q=80" },
              { label: "Authentification à 2 facteurs", desc: "Sécurisez votre compte avec un code SMS", image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=40&q=80" },
              { label: "Supprimer le compte",           desc: "Cette action est irréversible",          image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=40&q=80", danger: true },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: item.danger ? "#FFF5F5" : "#f8f9fa", borderRadius: "12px", border: item.danger ? "1px solid #FFE3E3" : "none" }}>
                <img src={item.image} alt="" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: item.danger ? "#E03131" : "#212529", margin: "0 0 3px" }}>{item.label}</p>
                  <p style={{ fontSize: "12px", color: "#868E96", margin: 0 }}>{item.desc}</p>
                </div>
                <button style={{ background: item.danger ? "#E03131" : couleur, color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {item.danger ? "Supprimer" : "Modifier"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}