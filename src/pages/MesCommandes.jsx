
import { useState } from "react";
import { getCommandes, annulerCommande } from "../services/serviceCommandes";
import { Link } from "react-router-dom";

const couleur = "#3B5BDB";
const toDH = (euros) => `${(euros * 10.8).toFixed(2)} DH`;
const IMG_ANNULEE = "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&q=80";

const STATUTS = {
  en_cours: { label: "En cours", bg: "#EEF2FF", color: couleur,   image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=40&q=80" },
  livree:   { label: "Livrée",   bg: "#E6FCF5", color: "#0CA678", image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=40&q=80" },
  annulee:  { label: "Annulée",  bg: "#FFF5F5", color: "#E03131", image: IMG_ANNULEE },
};

const ETAPES = [
  { label: "Commande passée", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=60&q=80" },
  { label: "En préparation",  image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=60&q=80" },
  { label: "En livraison",    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=60&q=80" },
  { label: "Livrée",          image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=60&q=80" },
];

function getEtapeActive(statut) {
  if (statut === "livree")  return 3;
  if (statut === "annulee") return 0;
  return 2;
}

export default function MesCommandes() {
  const [commandes, setCommandes] = useState(getCommandes());
  const [commandeOuverte, setCommandeOuverte] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleAnnuler = (id) => {
    annulerCommande(id);
    setCommandes(getCommandes());
    setConfirmation(null);
  };

  // ── AUCUNE COMMANDE ──
  if (commandes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 24px" }}>
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#212529", marginBottom: "10px" }}>Aucune commande</h2>
        <p style={{ color: "#868E96", fontSize: "14px", marginBottom: "24px" }}>Vous n'avez pas encore passé de commande.</p>
        <Link to="/catalogue">
          <button style={{ background: couleur, color: "white", border: "none", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>
            Voir le catalogue →
          </button>
        </Link>
      </div>
    );
  }

  const commandeDetail = commandes.find(c => c.id === commandeOuverte);

  return (
    <div>

      {/* ── MODAL CONFIRMATION ANNULATION ── */}
      {confirmation && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", maxWidth: "400px", width: "90%", textAlign: "center" }}>
            <div style={{ width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <img src={IMG_ANNULEE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#212529", marginBottom: "10px" }}>Annuler la commande ?</h3>
            <p style={{ fontSize: "13px", color: "#868E96", marginBottom: "24px" }}>Cette action est irréversible. Votre commande sera définitivement annulée.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={() => handleAnnuler(confirmation)} style={{ background: "#E03131", color: "white", border: "none", padding: "11px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>Oui, annuler</button>
              <button onClick={() => setConfirmation(null)} style={{ background: "#EEF2FF", color: couleur, border: "none", padding: "11px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}>Non, garder</button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, borderRadius: "14px", padding: "24px 32px", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>Mes Commandes</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{commandes.length} commande(s) passée(s)</p>
        </div>
        <div style={{ width: "56px", height: "56px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.3)" }}>
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=60&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: commandeOuverte ? "1fr 420px" : "1fr", gap: "24px", alignItems: "start" }}>

        {/* ── LISTE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[...commandes].reverse().map((cmd) => {
            const statut = cmd.statut || "en_cours";
            const s = STATUTS[statut];
            const ouvert = commandeOuverte === cmd.id;

            return (
              <div key={cmd.id} style={{ background: "white", borderRadius: "14px", border: ouvert ? `2px solid ${couleur}` : "0.5px solid #e9ecef", overflow: "hidden", transition: "border-color 0.2s" }}>

                {/* ── BANNIÈRE ANNULÉE ── */}
                {statut === "annulee" && (
                  <div style={{ position: "relative", height: "100px", overflow: "hidden" }}>
                    <img src={IMG_ANNULEE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(224,49,49,0.65)", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                      <img src={IMG_ANNULEE} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "2px solid white" }} />
                      <span style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>Commande annulée</span>
                    </div>
                  </div>
                )}

                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>

                  {/* Image premier article */}
                  <div style={{ width: "56px", height: "56px", background: "#f8f9fa", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {cmd.articles?.[0]?.image
                      ? <img src={cmd.articles[0].image} alt="" style={{ maxWidth: "48px", maxHeight: "48px", objectFit: "contain", opacity: statut === "annulee" ? 0.4 : 1 }} />
                      : <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=60&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                    }
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: statut === "annulee" ? "#868E96" : "#212529" }}>
                        Commande #{String(cmd.id).slice(-4)}
                      </span>
                      {/* Badge statut */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", background: s.bg, borderRadius: "20px", padding: "3px 10px 3px 6px" }}>
                        <img src={s.image} alt="" style={{ width: "18px", height: "18px", borderRadius: "50%", objectFit: "cover" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: s.color }}>{s.label}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#868E96" }}>
                      <span> {cmd.date}</span>
                      <span>{cmd.articles?.length} article(s)</span>
                      <span style={{ fontWeight: 700, color: statut === "annulee" ? "#E03131" : couleur }}>{toDH(cmd.total)}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <button onClick={() => setCommandeOuverte(ouvert ? null : cmd.id)} style={{ background: ouvert ? couleur : "#EEF2FF", color: ouvert ? "white" : couleur, border: "none", borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      {ouvert ? "Fermer" : "Voir détail"}
                    </button>
                    {statut !== "annulee" && statut !== "livree" && (
                      <button onClick={() => setConfirmation(cmd.id)} style={{ background: "#FFF5F5", color: "#E03131", border: "none", borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        Annuler
                      </button>
                    )}
                  </div>
                </div>

                {/* Miniatures articles */}
                {cmd.articles?.length > 0 && (
                  <div style={{ padding: "0 20px 16px", display: "flex", gap: "8px" }}>
                    {cmd.articles.slice(0, 5).map((a, i) => (
                      <div key={i} style={{ width: "36px", height: "36px", background: "#f8f9fa", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={a.image} alt="" style={{ maxWidth: "30px", maxHeight: "30px", objectFit: "contain", opacity: statut === "annulee" ? 0.4 : 1 }} />
                      </div>
                    ))}
                    {cmd.articles.length > 5 && (
                      <div style={{ width: "36px", height: "36px", background: "#EEF2FF", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: couleur }}>
                        +{cmd.articles.length - 5}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DÉTAIL ── */}
        {commandeDetail && (() => {
          const statut = commandeDetail.statut || "en_cours";
          const etapeActive = getEtapeActive(statut);
          return (
            <div style={{ background: "white", borderRadius: "14px", border: "0.5px solid #e9ecef", overflow: "hidden", position: "sticky", top: "80px" }}>

              <div style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, padding: "20px" }}>
                <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: "0 0 4px" }}>Commande #{String(commandeDetail.id).slice(-4)}</h2>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: 0 }}>{commandeDetail.date}</p>
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* SUIVI */}
                <div>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#212529", marginBottom: "16px" }}>Suivi de livraison</h3>

                  {statut === "annulee" ? (
                    <div style={{ borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                      <img src={IMG_ANNULEE} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block", filter: "grayscale(30%)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(224,49,49,0.65)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                        <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", border: "3px solid white" }}>
                          <img src={IMG_ANNULEE} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: 0 }}>Commande annulée</p>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px", margin: 0 }}>Cette commande a été annulée définitivement</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", top: "28px", left: "28px", right: "28px", height: "3px", background: "#e9ecef", borderRadius: "2px" }} />
                      <div style={{ position: "absolute", top: "28px", left: "28px", height: "3px", background: couleur, borderRadius: "2px", width: `${(etapeActive / (ETAPES.length - 1)) * 100}%`, transition: "width 0.5s" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                        {ETAPES.map((etape, i) => {
                          const fait = i <= etapeActive;
                          return (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "80px" }}>
                              <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", border: fait ? `3px solid ${couleur}` : "3px solid #e9ecef", background: "white" }}>
                                <img src={etape.image} alt={etape.label} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: fait ? 1 : 0.4 }} />
                              </div>
                              <span style={{ fontSize: "10px", fontWeight: fait ? 700 : 400, color: fait ? couleur : "#adb5bd", textAlign: "center", lineHeight: 1.3 }}>{etape.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ height: "0.5px", background: "#e9ecef" }} />

                {/* ARTICLES */}
                <div>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#212529", marginBottom: "12px" }}>Articles commandés</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {commandeDetail.articles?.map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "44px", height: "44px", background: "#f8f9fa", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <img src={a.image} alt={a.title} style={{ maxWidth: "38px", maxHeight: "38px", objectFit: "contain" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "12px", fontWeight: 600, color: "#212529", margin: "0 0 2px" }}>{a.title?.slice(0, 35)}...</p>
                          <p style={{ fontSize: "11px", color: "#868E96", margin: 0 }}>Qté : {a.quantite}</p>
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: couleur }}>{toDH(a.price * a.quantite)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: "0.5px", background: "#e9ecef" }} />

                {/* ADRESSE */}
                {commandeDetail.adresse?.ville && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f8f9fa", borderRadius: "10px", padding: "12px" }}>
                    <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=60&q=80" alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: "11px", color: "#868E96", margin: "0 0 2px" }}>Adresse de livraison</p>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#212529", margin: 0 }}>{commandeDetail.adresse.prenom} — {commandeDetail.adresse.ville}</p>
                      <p style={{ fontSize: "11px", color: "#868E96", margin: 0 }}>{commandeDetail.adresse.adresse}</p>
                    </div>
                  </div>
                )}

                {/* TOTAL */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#EEF2FF", borderRadius: "10px", padding: "14px 16px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#212529" }}>Total payé</span>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: couleur }}>{toDH(commandeDetail.total)}</span>
                </div>

                {/* BOUTON ANNULER */}
                {statut !== "annulee" && statut !== "livree" && (
                  <button onClick={() => setConfirmation(commandeDetail.id)} style={{ background: "#FFF5F5", color: "#E03131", border: "1.5px solid #E03131", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                    Annuler cette commande
                  </button>
                )}

                <Link to="/catalogue">
                  <button style={{ background: `linear-gradient(135deg, ${couleur}, #4C6EF5)`, color: "white", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(59,91,219,0.35)" }}>
                    Continuer mes achats →
                  </button>
                </Link>

              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}