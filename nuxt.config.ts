// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  i18n: {
    defaultLocale: 'ru'
  },
  extends: ['@nuxt/ui-pro'],
  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxtjs/i18n"]
})