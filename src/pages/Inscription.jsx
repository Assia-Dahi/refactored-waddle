import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const couleur = "#3B5BDB";

export default function Inscription() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", telephone: "", motDePasse: "", confirmer: "" });
  const [erreur, setErreur] = useState("");
  const [voir, setVoir] = useState(false);
  const [accepte, setAccepte] = useState(false);
  const [chargement, setChargement] = useState(false);
  const { connecter } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.prenom || !form.email || !form.motDePasse) {
      setErreur("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (form.motDePasse !== form.confirmer) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!accepte) {
      setErreur("Veuillez accepter les conditions d'utilisation.");
      return;
    }
    setChargement(true);
    setTimeout(() => {
      connecter({ id: Date.now(), nom: `${form.prenom} ${form.nom}`, email: form.email });
      navigate("/");
    }, 1000);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(59,91,219,0.15)", maxWidth: "900px", width: "100%" }}>

        {/* ── GAUCHE IMAGE ── */}
        <div style={{ position: "relative", minHeight: "600px" }}>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(59,91,219,0.85), rgba(76,110,245,0.75))`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "70px", height: "70px", background: "white", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=60&q=80" alt="" style={{ width: "50px", height: "50px", borderRadius: "10px", objectFit: "cover" }} />
            </div>
            <h2 style={{ color: "white", fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>Rejoignez E-Store</h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: 1.7, marginBottom: "32px" }}>
              Créez votre compte et profitez d'une expérience shopping unique avec des milliers de produits.
            </p>
           {[
  {
    label: "Commandes suivies en temps réel",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h13v13H3z"/>
        <path d="M16 8h4l2 2v6h-6z"/>
        <circle cx="7.5" cy="18.5" r="1.5"/>
        <circle cx="17.5" cy="18.5" r="1.5"/>
      </svg>
    )
  },
  {
    label: "Offres exclusives membres",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="13"/>
        <path d="M3 8h18"/>
        <path d="M12 8v13"/>
        <path d="M12 3c1.5 0 3 1 3 2.5S12 8 12 8s-3-1-3-2.5S10.5 3 12 3z"/>
      </svg>
    )
  },
  {
    label: "Retours gratuits 30 jours",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.5 15a9 9 0 1 0 2-9"/>
      </svg>
    )
  },
  {
    label: "Support client 24/7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
        <rect x="2" y="15" width="4" height="6"/>
        <rect x="18" y="15" width="4" height="6"/>
      </svg>
    )
  }
].map((b, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "rgba(255,255,255,0.15)",
      borderRadius: "10px",
      padding: "10px 16px",
      marginBottom: "10px",
      width: "100%"
    }}
  >
    {b.icon}
    <span style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>
      {b.label}
    </span>
  </div>
))}
          </div>
        </div>

        {/* ── DROITE FORMULAIRE ── */}
        <div style={{ background: "white", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#212529", marginBottom: "6px" }}>Créer un compte </h1>
          <p style={{ fontSize: "14px", color: "#868E96", marginBottom: "28px" }}>Rejoignez des milliers de clients satisfaits</p>

          {/* Erreur */}
          {erreur && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#FFF5F5", border: "1px solid #FFE3E3", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
              <img src="https://images.unsplash.com/photo-1605792657660-596af9009e82?w=30&q=80" alt="" style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ fontSize: "13px", color: "#E03131", fontWeight: 500 }}>{erreur}</span>
            </div>
          )}

          {/* Prénom + Nom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {[
              { key: "prenom", label: "Prénom *",  placeholder: "Votre prénom" },
              { key: "nom",    label: "Nom",        placeholder: "Votre nom" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e9ecef", fontSize: "13px", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = couleur}
                  onBlur={e => e.target.style.borderColor = "#e9ecef"}
                />
              </div>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>Email *</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #e9ecef", borderRadius: "10px", padding: "10px 12px" }}>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#868E96" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
              <input
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ border: "none", outline: "none", fontSize: "13px", color: "#212529", width: "100%", fontFamily: "inherit" }}
                onFocus={e => e.target.closest("div").style.borderColor = couleur}
                onBlur={e => e.target.closest("div").style.borderColor = "#e9ecef"}
              />
            </div>
          </div>

          {/* Téléphone */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>Téléphone</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1.5px solid #e9ecef", borderRadius: "10px", padding: "10px 12px" }}>
              <svg
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#868E96"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
  style={{ flexShrink: 0 }}
>
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
           19.79 19.79 0 0 1-8.63-3.07 
           19.5 19.5 0 0 1-6-6 
           19.79 19.79 0 0 1-3.07-8.67 
           A2 2 0 0 1 4.11 2h3 
           a2 2 0 0 1 2 1.72 
           12.84 12.84 0 0 0 .7 2.81 
           2 2 0 0 1-.45 2.11L8.09 9.91 
           a16 16 0 0 0 6 6l1.27-1.27 
           a2 2 0 0 1 2.11-.45 
           12.84 12.84 0 0 0 2.81.7 
           A2 2 0 0 1 22 16.92z"/>
</svg>
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                value={form.telephone}
                onChange={e => setForm({ ...form, telephone: e.target.value })}
                style={{ border: "none", outline: "none", fontSize: "13px", color: "#212529", width: "100%", fontFamily: "inherit" }}
                onFocus={e => e.target.closest("div").style.borderColor = couleur}
                onBlur={e => e.target.closest("div").style.borderColor = "#e9ecef"}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {[
              { key: "motDePasse", label: "Mot de passe *",  placeholder: "••••••••" },
              { key: "confirmer",  label: "Confirmer *",      placeholder: "••••••••" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#495057", display: "block", marginBottom: "6px" }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1.5px solid #e9ecef", borderRadius: "10px", padding: "10px 12px" }}>
                  <input
                    type={voir ? "text" : "password"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{ border: "none", outline: "none", fontSize: "13px", color: "#212529", width: "100%", fontFamily: "inherit" }}
                    onFocus={e => e.target.closest("div").style.borderColor = couleur}
                    onBlur={e => e.target.closest("div").style.borderColor = "#e9ecef"}
                  />
                  {key === "confirmer" && (
                    <button
  onClick={() => setVoir(!voir)}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center"
  }}
>
  {voir ? (
    // 👁️ Visible
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#868E96"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    // 🙈 Caché (œil barré)
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#868E96"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94"/>
      <path d="M1 1l22 22"/>
      <path d="M9.53 9.53a3 3 0 0 0 4.24 4.24"/>
      <path d="M14.47 14.47L9.53 9.53"/>
      <path d="M21 12s-1.5 3-4 5"/>
    </svg>
  )}
</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Force mot de passe */}
          {form.motDePasse && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: form.motDePasse.length >= i * 2 ? (form.motDePasse.length >= 8 ? "#0CA678" : "#F59F00") : "#e9ecef" }} />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: form.motDePasse.length >= 8 ? "#0CA678" : "#F59F00" }}>
                {form.motDePasse.length >= 8 ? "Mot de passe fort ✓" : "Mot de passe trop court"}
              </span>
            </div>
          )}

          {/* Conditions */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "24px" }}>
            <input
              type="checkbox"
              checked={accepte}
              onChange={e => setAccepte(e.target.checked)}
              style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: couleur, cursor: "pointer" }}
            />
            <span style={{ fontSize: "12px", color: "#868E96", lineHeight: 1.6 }}>
              J'accepte les{" "}
              <span style={{ color: couleur, fontWeight: 600, cursor: "pointer" }}>conditions d'utilisation</span>
              {" "}et la{" "}
              <span style={{ color: couleur, fontWeight: 600, cursor: "pointer" }}>politique de confidentialité</span>
            </span>
          </div>

          {/* Bouton inscription */}
          <button
            onClick={handleSubmit}
            disabled={chargement}
            style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, color: "white", border: "none", borderRadius: "10px", padding: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(59,91,219,0.35)", marginBottom: "20px", opacity: chargement ? 0.7 : 1 }}
          >
            {chargement ? "Création en cours..." : "Créer mon compte →"}
          </button>

          {/* Lien connexion */}
          <p style={{ textAlign: "center", fontSize: "13px", color: "#868E96", margin: 0 }}>
            Déjà un compte ?{" "}
            <Link to="/connexion" style={{ color: couleur, fontWeight: 700 }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}