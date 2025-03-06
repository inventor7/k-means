import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      imports: ["vue", "pinia", "vue-router", "@vueuse/core", "vue-i18n"],

      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: false,

      // Options for scanning directories for auto import
      dirsScanOptions: {
        types: true, // Enable auto import the types under the directories
      },

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        "./hooks",
        "./composables", // only root modules
        "./composables/**", // all nested modules
        // ...

        {
          glob: "./hooks",
          types: true, // enable import the types
        },
        {
          glob: "./composables",
          types: false, // If top level dirsScanOptions.types importing enabled, just only disable this directory
        },
        // ...
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: "./auto-imports.d.ts",

      // Array of strings of regexes that contains imports meant to be ignored during
      // the declaration file generation. You may find this useful when you need to provide
      // a custom signature for a function.
      ignoreDts: ["ignoredFunction", /^ignore_/],

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: true,

      // Auto import directives inside Vue template
      // see https://github.com/unjs/unimport/pull/374
      vueDirectives: undefined,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],

      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enablevue-router/composables
      viteOptimizeDeps: true,

      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // Generate corresponding .biomelintrc-auto-import.json file.
      // biomejs extends Docs - https://biomejs.dev/guides/how-biome-works/#the-extends-option
      biomelintrc: {
        enabled: false, // Default `false`
        filepath: "./.biomelintrc-auto-import.json", // Default `./.biomelintrc-auto-import.json`
      },

      // Save unimport items into a JSON file for other tools to consume
      dumpUnimportItems: "./auto-imports.json", // Default `false`
    }),
    Components({
      dirs: ["src/components"],
      resolvers: [IconsResolver()],
    }),

    Icons({
      autoInstall: true,
    }),
    VueI18nPlugin({
      // locale messages resource pre-compile option
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/i18n/locales/**"
      ),
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    __VUE_I18N_LEGACY_API__: false,
  },
});
