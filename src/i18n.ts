import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "US", // Default language
    fallbackLng: "US", // Fallback language
    debug: true, // Enable debug mode to see detailed logs
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
