/// <reference types="vite/client" />

import type { LanguageCode } from "./plugins/i18n";

interface ImportMetaEnv {
  readonly VITE_DEFAULT_LOCALE: LanguageCode;
  readonly VITE_FALLBACK_LOCALE: LanguageCode;
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
