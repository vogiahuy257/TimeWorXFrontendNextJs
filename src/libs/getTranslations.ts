// libs/getTranslations.ts
import 'server-only'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'
import jp from '@/locales/jp.json'

const translations = { en, vi, jp }

export function getTranslations(lang: string) {
  'use cache' // SSR caching nếu lang giống nhau
  return translations[lang as keyof typeof translations] || translations.en
}
