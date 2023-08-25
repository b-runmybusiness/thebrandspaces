import tailwindTypography from '@tailwindcss/typography';
import tailwindForm from '@tailwindcss/forms';

export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental:{
    viewTransition: true,
    renderJsonPayloads: true,
    payloadExtraction: false,
  },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/supabase",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "dayjs-nuxt"
  ],
  supabase: {
    redirect: false,
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],
  tailwindcss: {
    config:{
      theme: {
        extend: {
          colors: {
            primary: "#DA251D"
          }
        }
      },
      plugins: [tailwindTypography, tailwindForm],
    },
  },

  // build:{
  //   transpile: ['vue-toastification'],
  // }
  
})