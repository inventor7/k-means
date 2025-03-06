import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import {
  loadLocaleMessages,
  setI18nLanguage,
  SUPPORT_LOCALES,
  type LanguageCode,
  setupI18n,
} from "@/plugins/i18n";
import { useLanguageStore } from "@/stores/useLanguageStore";

// Initialize i18n instance
const i18n = setupI18n();

export const useLanguageGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const paramsLocale = to.params.locale as LanguageCode | undefined;
  const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE as LanguageCode;
  const languageStore = useLanguageStore();

  if (!paramsLocale) {
    return next(`/${defaultLocale}${to.fullPath}`);
  }

  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    return next(`/${defaultLocale}${to.fullPath}`);
  }

  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale);
  }

  setI18nLanguage(i18n, paramsLocale);
  languageStore.currentLanguage = paramsLocale;
  languageStore.direction = languageStore.languages[paramsLocale].dir;

  return next();
};

export { i18n };
