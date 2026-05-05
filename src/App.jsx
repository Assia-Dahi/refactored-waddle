import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexte/ContexteAuth";
import { ProviderPanier } from "./contexte/ContextePanier";
import BarreNavigation from "./components/layout/BarreNavigation";
import PiedDePage from "./components/layout/PiedDePage";

import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import DetailProduit from "./pages/DetailProduit";
import Panier from "./pages/Panier";
import MesCommandes from "./pages/MesCommandes";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Profil from "./pages/Profil";


// LAYOUT
function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <BarreNavigation />

      <div style={styles.mainContainer}>
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/produit/:id" element={<DetailProduit />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/mes-commandes" element={<MesCommandes />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </main>

        <PiedDePage />
      </div>
    </div>
  );
}


// 🚀 APP
export default function App() {
  return (
    <AuthProvider>
      <ProviderPanier>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ProviderPanier>
    </AuthProvider>
  );
}


// 🎨 STYLES
const styles = {
  mainContainer: {
    marginLeft: "220px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  main: {
    padding: "25px",
    flex: 1,
  },
};