import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connexion } from "../services/serviceAuth";
import { useAuth } from "../hooks/useAuth";

const couleur = "#3B5BDB";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const [voir, setVoir] = useState(false);
  const { connecter } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !motDePasse) {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }
    setChargement(true);
    setErreur("");
    try {
      const user = await connexion(email, motDePasse);
      connecter(user);
      navigate("/");
    } catch {
      setErreur("Email ou mot de passe incorrect.");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(59,91,219,0.15)", maxWidth: "900px", width: "100%" }}>

        {/* ── GAUCHE IMAGE ── */}
        <div style={{ position: "relative", minHeight: "500px" }}>
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(59,91,219,0.85), rgba(76,110,245,0.75))`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "70px", height: "70px", background: "white", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=60&q=80" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", objectFit: "cover" }} />
            </div>
            <h2 style={{ color: "white", fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>E-Store</h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: 1.7, marginBottom: "32px" }}>
              Connectez-vous pour accéder à votre compte et profiter de toutes nos offres exclusives.
            </p>
            {/* Badges */}
            {[
              { label: "500+ Produits",       image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=30&q=80" },
              { label: "Livraison rapide 24h", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=30&q=80" },
              { label: "Paiement sécurisé",   image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=30&q=80" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "10px 16px", marginBottom: "10px", width: "100%" }}>
                <img src={b.image} alt="" style={{ width: "28px", height: "28px", borderRadius: "6px", objectFit: "cover" }} />
                <span style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DROITE FORMULAIRE ── */}
        <div style={{ background: "white", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#212529", marginBottom: "6px" }}>Bon retour ! </h1>
          <p style={{ fontSize: "14px", color: "#868E96", marginBottom: "32px" }}>Connectez-vous à votre compte E-Store</p>

         {/* Erreur */}
{erreur && (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#FFF5F5", border: "1px solid #FFE3E3", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E03131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span style={{ fontSize: "13px", color: "#E03131", fontWeight: 500 }}>{erreur}</span>
  </div>
)}

         {/* Email */}
<div style={{ marginBottom: "16px" }}>
  <label style={{ fontSize: "13px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "8px" }}>Adresse email</label>
  <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #e9ecef", borderRadius: "10px", padding: "11px 14px", transition: "border-color 0.2s" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#868E96" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
    <input
      type="email"
      placeholder="votre@email.com"
      value={email}
      onChange={e => setEmail(e.target.value)}
      style={{ border: "none", outline: "none", fontSize: "14px", color: "#212529", width: "100%", fontFamily: "inherit", background: "transparent" }}
      onFocus={e => e.target.closest("div").style.borderColor = couleur}
      onBlur={e => e.target.closest("div").style.borderColor = "#e9ecef"}
    />
  </div>
</div>

{/* Mot de passe */}
<div style={{ marginBottom: "12px" }}>
  <label style={{ fontSize: "13px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "8px" }}>Mot de passe</label>
  <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #e9ecef", borderRadius: "10px", padding: "11px 14px", transition: "border-color 0.2s" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#868E96" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
    <input
      type={voir ? "text" : "password"}
      placeholder="••••••••"
      value={motDePasse}
      onChange={e => setMotDePasse(e.target.value)}
      onKeyDown={e => e.key === "Enter" && handleSubmit()}
      style={{ border: "none", outline: "none", fontSize: "14px", color: "#212529", width: "100%", fontFamily: "inherit", background: "transparent" }}
      onFocus={e => e.target.closest("div").style.borderColor = couleur}
      onBlur={e => e.target.closest("div").style.borderColor = "#e9ecef"}
    />
    {/* Bouton afficher/masquer */}
    <button onClick={() => setVoir(!voir)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, color: "#868E96", display: "flex", alignItems: "center" }}>
      {voir ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  </div>
</div>

          {/* Mot de passe oublié */}
          <div style={{ textAlign: "right", marginBottom: "28px" }}>
            <span style={{ fontSize: "13px", color: couleur, fontWeight: 600, cursor: "pointer" }}>Mot de passe oublié ?</span>
          </div>

          {/* Bouton connexion */}
          <button
            onClick={handleSubmit}
            disabled={chargement}
            style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, color: "white", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(59,91,219,0.35)", marginBottom: "20px", opacity: chargement ? 0.7 : 1 }}
          >
            {chargement ? "Connexion en cours..." : "Se connecter →"}
          </button>

          {/* Séparateur */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "#e9ecef" }} />
            <span style={{ fontSize: "12px", color: "#adb5bd" }}>ou continuer avec</span>
            <div style={{ flex: 1, height: "0.5px", background: "#e9ecef" }} />
          </div>

          {/* Boutons sociaux avec vrais logos */}
{[
  {
    label: "Google",
    logo: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    logo: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
      </svg>
    ),
  },
].map(({ label, logo }) => (
  <button key={label} style={{
    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
    padding: "10px 16px", flex: 1,
    background: "white", border: "1.5px solid #e9ecef",
    borderRadius: "10px", cursor: "pointer",
    fontSize: "13px", fontWeight: 600, color: "#212529",
    fontFamily: "inherit",
  }}>
    {logo}
    {label}
  </button>
))}

          {/* Lien inscription */}
          <p style={{ textAlign: "center", fontSize: "13px", color: "#868E96", margin: 0 }}>
            Pas encore de compte ?{" "}
            <Link to="/inscription" style={{ color: couleur, fontWeight: 700 }}>S'inscrire gratuitement</Link>
          </p>
        </div>
      </div>
    </div>
  );
}