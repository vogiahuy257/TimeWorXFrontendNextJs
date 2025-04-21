// hooks/useTranslation.ts
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export function useTranslation(namespace: string) {
    const [lang] = useState(Cookies.get('lang') || 'vi')
    const [t, setT] = useState<Record<string, string>>({})

    useEffect(() => {
        import(`@/public/locales/${lang}/${namespace}.json`)
            .then(setT)
            .catch(() => setT({}))
    }, [lang, namespace])

    return t
}
