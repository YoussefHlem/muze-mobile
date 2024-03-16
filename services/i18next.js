// i18n.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18next
  .use(initReactI18next) // Use React-i18next for React Native
  .init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: languageResources,
  });

export default i18next;
