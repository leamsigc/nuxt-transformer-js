import { env } from 'node:process'
import { OgImage } from './.nuxt/components.d'

import { checkEnv } from './config/env.config'

checkEnv(env)

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@formkit/nuxt',
    'shadcn-nuxt',
    '@nuxt/eslint',
    'radix-vue/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/motion/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  site: {
    url: 'https://nuxt-transformers-js.netlify.app',
    name: 'Nuxt Transformers JS',
    description: 'Use the latest supported AI model in the browser with TransformerJS',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  colorMode: {
    classSuffix: '',
  },
  content: {
    // studio: {
    //   enabled: true
    // },
    build: {
      pathMeta: {
        forceLeadingSlash: true,
      },
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          // theme: 'github-light',
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'monokai',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
        },
      },
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  formkit: {
    // autoImport: true,
    configFile: './config/formkit.config.ts',
  },
  image: {
    quality: 75,
    format: ['webp'],
  },
  ogImage: {
    componentOptions: {
      global: true,
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    configPath: './config/tailwind.config.ts',
  },
})
