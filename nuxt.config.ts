// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Ubuntu Mono', provider: 'google', global: true },
    ],
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})