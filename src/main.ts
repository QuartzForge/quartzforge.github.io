import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { router } from './router'
import ptBR from './locales/pt-BR'
import en from './locales/en'
import { revealDirective } from './composables/useReveal'

const savedLocale = localStorage.getItem('qf-locale') ?? 'pt-BR'
const locale = savedLocale === 'en' ? 'en' : 'pt-BR'

document.documentElement.classList.add('js')

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR, en },
})

createApp(App)
  .use(router)
  .use(i18n)
  .directive('reveal', revealDirective)
  .mount('#app')
