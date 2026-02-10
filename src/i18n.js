import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import hi from './locales/hi.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  globalInjection: true,
  messages: {
    en,
    hi
  }
})

export const setLanguage = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('language', locale)
}

export default i18n
