/*import React from "react";
import theme from "./config/theme";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/poppins";
import BrandSetup from "./pages/BrandSetup/BrandSetup";
import Sidebar from "./components/utils/SideBar/SideBar";
import AppBar from "./components/utils/AppBar/AppBar";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/AuthForm/Login";
import SignUp from "./pages/AuthForm/Signup";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/";

  return (
    <div className={styles.appContainer}>
      {!isLoginPage && <Sidebar />}
      <div
        className={`${styles.mainContainer} ${
          !isLoginPage ? styles.withSidebar : ""
        }`}
      >
        <div
          className={isLoginPage ? styles.fullPageContent : styles.pageContent}
        >
          {!isLoginPage && <AppBar />}
          <Routes>
            <Route path="/brand-setup" element={<BrandSetup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          
          </Routes>
        </div>
      </div>
    </div>
  );
};
//
export default App;
*/

import React, { useEffect } from "react";
import theme from "./config/theme";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/poppins";
import BrandSetup from "./pages/BrandSetup/BrandSetup";
import Sidebar from "./components/utils/SideBar/SideBar";
import AppBar from "./components/utils/AppBar/AppBar";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/AuthForm/Login";
import SignUp from "./pages/AuthForm/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Payment from "./pages/Payment/Payment";
import NewProject from "./pages/NewProject/NewProject";
import AIGenerated from "./pages/AIGenerated/AIGenerated";
import SocialCreative from "./pages/SocialCreatives/SocialCreatives";
import BackGroundImage from "./pages/BackgroundImage/BackGroundImage";
import TextOnImage from "./pages/TextOnImage/TextOnImage";
import TemplateSocialCreative from "./pages/TemplateSocialCreative/TemplateSocialCreative";
import ProductCreative from "./pages/ProductCreatives/ProductCreatives";
import BackgroundRemoval from "./pages/BackgroundRemoval/BackgroundRemoval";
import AIBackground from "./pages/AIBackground/AIBackground";
import ProductCreativePreview from "./pages/ProductCreativePreview/ProductCreativePreview";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";
import Pricing from "./pages/Pricing/Pricing";
import AppBarMain from "./components/utils/AppBarMain/AppBarMain";
import Setting from "./pages/Setting/Setting";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import HomeBrandFeature from "./pages/HomeFeaturePricing/HomeFeaturePricing";
import CreativeEditor from "./pages/CreativeEditor/CreativeEditor";

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const language = Cookies.get("language") || "en";

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/payment";

  const isHomePage =
    location.pathname === "/home" ||
    location.pathname === "/features" ||
    location.pathname === "/" ||
    location.pathname === "/pricing" ||
    location.pathname === "*";

  return (
    <div className={styles.appContainer}>
      {/*!isLoginPage && <Sidebar />*/}
      <div
        className={`${styles.mainContainer} ${
          !isLoginPage ? styles.withSidebar : ""
        }`}
      >
        <div
          className={isLoginPage ? styles.fullPageContent : styles.pageContent}
        >
          {!isLoginPage && !isHomePage && <AppBar />}
          {isHomePage && <AppBarMain />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/payment" element={<Payment />} />

            <Route path="/" element={<HomeBrandFeature />} />
            <Route path="/creative-editor" element={<CreativeEditor />} />
            {/*<Route path="/home" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />*/}

            {/*   <Route path="/settings" element={<Setting />} />
            <Route path="/project-setup" element={<NewProject />} />
            <Route path="/asset-selection" element={<AIGenerated />} />
            <Route path="/social-creatives" element={<SocialCreative />} />
            <Route path="/background-image" element={<BackGroundImage />} />
            <Route path="/text-on-image" element={<TextOnImage />} />
            <Route path="/brand-setup" element={<BrandSetup />} />
            <Route path="/project/:id" element={<TemplateSocialCreative />} />

            <Route path="/product-creatives" element={<ProductCreative />} />
            <Route path="/background-removal" element={<BackgroundRemoval />} />
            <Route path="/ai-background-styles" element={<AIBackground />} />
            <Route
              path="/product-creative/:id"
              element={<ProductCreativePreview />}
            />*/}

            {/* Protected route example */}
            <Route
              path="/brand-setup"
              element={
                <ProtectedRoute>
                  <BrandSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-setup"
              element={
                <ProtectedRoute>
                  <NewProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/asset-selection"
              element={
                <ProtectedRoute>
                  <AIGenerated />
                </ProtectedRoute>
              }
            />
            <Route
              path="/social-creatives"
              element={
                <ProtectedRoute>
                  <SocialCreative />
                </ProtectedRoute>
              }
            />
            <Route
              path="/background-image"
              element={
                <ProtectedRoute>
                  <BackGroundImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/text-on-image"
              element={
                <ProtectedRoute>
                  <TextOnImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProtectedRoute>
                  <TemplateSocialCreative />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-creatives"
              element={
                <ProtectedRoute>
                  <ProductCreative />
                </ProtectedRoute>
              }
            />
            <Route
              path="/background-removal"
              element={
                <ProtectedRoute>
                  <BackgroundRemoval />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-background-styles"
              element={
                <ProtectedRoute>
                  <AIBackground />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-creative/:id"
              element={
                <ProtectedRoute>
                  <ProductCreativePreview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
