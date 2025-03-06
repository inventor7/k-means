import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import type { LanguageCode } from "@/plugins/i18n";

type Direction = "ltr" | "rtl";

interface LanguageInfo {
  name: string;
  flag: string;
  dir: Direction;
}

export const useLanguageStore = defineStore("language", () => {
  const router = useRouter();
  const currentLanguage = ref<LanguageCode>(
    import.meta.env.VITE_DEFAULT_LOCALE as LanguageCode
  );
  const direction = ref<Direction>("ltr");

  const languages = computed<Record<LanguageCode, LanguageInfo>>(() => ({
    en: {
      name: "English",
      flag: "🇺🇸",
      dir: "ltr",
    },
    fr: {
      name: "Français",
      flag: "🇫🇷",
      dir: "ltr",
    },
    ar: {
      name: "العربية",
      flag: "🇸🇦",
      dir: "rtl",
    },
  }));

  const currentLanguageInfo = computed<LanguageInfo>(
    () => languages.value[currentLanguage.value]
  );

  async function setLanguage(locale: LanguageCode) {
    const currentRoute = router.currentRoute.value;
    const newPath = `/${locale}${currentRoute.fullPath.replace(
      /^\/[^/]+/,
      ""
    )}`;

    // Update store state
    currentLanguage.value = locale;
    direction.value = languages.value[locale].dir;

    // Save preference
    localStorage.setItem("language", locale);

    // Navigate to new locale path
    await router.push(newPath);
  }

  function initializeLanguage() {
    const savedLanguage = localStorage.getItem("language") as LanguageCode;
    const urlLocale = window.location.pathname.split("/")[1] as LanguageCode;
    const initialLanguage =
      urlLocale || savedLanguage || import.meta.env.VITE_DEFAULT_LOCALE;

    if (languages.value[initialLanguage]) {
      currentLanguage.value = initialLanguage;
      direction.value = languages.value[initialLanguage].dir;
    }
  }

  return {
    currentLanguage,
    direction,
    languages,
    currentLanguageInfo,
    setLanguage,
    initializeLanguage,
  };
});
