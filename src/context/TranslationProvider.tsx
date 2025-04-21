'use client'

import { createContext, useContext } from 'react'

type TranslationContextType = {
  lang: string
  t: Record<string, string>
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const TranslationProvider = ({
  lang,
  t,
  children,
}: {
  lang: string
  t: Record<string, string>
  children: React.ReactNode
}) => {
  return (
    <TranslationContext.Provider value={{ lang, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) throw new Error('useTranslation must be used within a TranslationProvider')
  return context
}
