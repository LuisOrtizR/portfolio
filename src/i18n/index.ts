import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import pt from './locales/pt'

// Detect browser language
const getBrowserLocale = (): string => {
  const saved = localStorage.getItem('locale')
  if (saved && ['en', 'es', 'pt'].includes(saved)) return saved

  const browserLang = navigator.language.split('-')[0]
  if (['en', 'es', 'pt'].includes(browserLang)) return browserLang

  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages: { en, es, pt },
})

export default i18n
