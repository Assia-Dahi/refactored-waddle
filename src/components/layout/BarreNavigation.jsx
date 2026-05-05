import { Link, useLocation } from "react-router-dom";
import { usePanier } from "../../hooks/usePanier";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  {
    path: "/",
    label: "Accueil",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    path: "/catalogue",
    label: "Catalogue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    path: "/panier",
    label: "Panier",
    badge: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    path: "/mes-commandes",
    label: "Mes commandes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    path: "/profil",
    label: "Profil",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

const iconDeconnexion = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const iconConnexion = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

export default function BarreNavigation() {
  const { totalArticles } = usePanier();
  const { utilisateur, deconnecter } = useAuth();
  const location = useLocation();

  return (
    <aside style={{
      width: "220px",
      background: "white",
      borderRight: "0.5px solid #e9ecef",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{ padding: "20px 20px 18px", borderBottom: "0.5px solid #e9ecef" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px",
            background: "#3B5BDB",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <path d="M3 9h18"/>
              <path d="M9 21V9"/>
            </svg>
          </div>
          <span style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "-0.3px",
          }}>
            E-Store
          </span>
        </div>
      </div>

      {/* Liens */}
      <nav style={{ flex: 1, padding: "10px 10px 0" }}>
        {navItems.map((item) => {
          const actif = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                marginBottom: "2px",
                borderRadius: "9px",
                fontSize: "13.5px",
                fontWeight: actif ? 600 : 400,
                color: actif ? "#3B5BDB" : "#495057",
                background: actif ? "#EEF2FF" : "transparent",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <span style={{ opacity: actif ? 1 : 0.55, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && totalArticles > 0 && (
                <span style={{
                  background: "#E03131", color: "white",
                  fontSize: "11px", fontWeight: 700,
                  padding: "1px 7px", borderRadius: "10px",
                  lineHeight: "18px",
                }}>
                  {totalArticles}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Utilisateur + déconnexion */}
      <div style={{ borderTop: "0.5px solid #e9ecef", padding: "12px 10px" }}>
        {utilisateur ? (
          <>
            {/* Infos utilisateur */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "8px 12px", marginBottom: "4px",
              borderRadius: "9px", background: "#f8f9fa",
            }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%",
                background: "#3B5BDB",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "12px", fontWeight: 700, flexShrink: 0,
              }}>
                {utilisateur.nom?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#212529", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {utilisateur.nom}
                </div>
                <div style={{ fontSize: "11px", color: "#868E96", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {utilisateur.email}
                </div>
              </div>
            </div>

            {/* Bouton déconnexion */}
            <button
              onClick={deconnecter}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", width: "100%",
                background: "none", border: "none", borderRadius: "9px",
                cursor: "pointer", fontSize: "13.5px",
                color: "#C92A2A", fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#FFF5F5"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ flexShrink: 0 }}>{iconDeconnexion}</span>
              Se déconnecter
            </button>
          </>
        ) : (
          <Link
            to="/connexion"
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "9px",
              fontSize: "13.5px", fontWeight: 500,
              color: "#3B5BDB", textDecoration: "none",
              transition: "background 0.15s",
            }}
          >
            <span style={{ flexShrink: 0 }}>{iconConnexion}</span>
            Se connecter
          </Link>
        )}
      </div>
    </aside>
  );
}