# Modern Vue.js Template

A feature-rich starter template for Vue 3 applications with batteries included.

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- 🚀 [Vue 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) for lightning-fast development
- 🎨 [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- 🔤 [TypeScript](https://www.typescriptlang.org/) for enhanced developer experience
- 📦 [Shadcn-vue](https://www.shadcn-vue.com/) & [Reka Ui](https://reka-ui.com/) for beautiful UI components
- 🌐 [Vue I18n](https://vue-i18n.intlify.dev/) for internationalization
- 🎯 [VueUse](https://vueuse.org/) for useful composables
- 🎭 Dark mode support with system preference detection
- 📱 Responsive design out of the box
- ⚡️ RTL language support
- 🧪 Testing setup with [Vitest](https://vitest.dev/) and [Cypress](https://www.cypress.io/)
- 📝 Auto-imports for components and Vue APIs
- 🔍 VS Code configuration included

## 🚀 Quick Start

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the directory
cd vue-template

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` to see your application.

## 📖 Available Scripts

```bash
# Development
pnpm dev           # Start development server

# Building
pnpm build         # Build for production
pnpm preview       # Preview production build

# Testing
pnpm test:unit     # Run unit tests
pnpm test:e2e      # Run end-to-end tests
pnpm test:e2e:dev  # Run e2e tests against dev server

# Type checking
pnpm type-check    # Run TypeScript type checking
```

## 🔧 IDE Setup

We recommend using [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 support
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

Remember to disable the Vetur extension if you have it installed.

## 🌐 Internationalization

The template comes with built-in i18n support. Translations are stored in `src/locales/`.

To add a new language:

1. Create a new JSON file in `src/locales/` (e.g., `de.json`)
2. Add the language to `src/plugins/i18n.ts`
3. Update the language switcher in `src/components/app/global/LanguageSwitcher.vue`

## 🎨 Theming

The template uses Tailwind CSS for styling and includes a built-in dark mode.

- Theme switching is handled by `src/components/app/global/ThemeSwitcher.vue`
- Default theme is based on system preferences
- Theme is persisted across page reloads

## 📁 Project Structure

```
.
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Vue components
│   │   ├── app/        # Application-specific components
│   │   └── ui/         # Reusable UI components
│   ├── composables/     # Vue composables
│   ├── locales/        # i18n translations
│   ├── plugins/        # Vue plugins
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   └── views/          # Page components
├── public/             # Public static assets
└── cypress/            # E2E tests
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
