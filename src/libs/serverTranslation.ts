// lib/serverTranslation.ts
import fs from 'fs'
import path from 'path'

export const serverTranslation = (lang: string, namespace: string): Record<string, string> => {
    try {
        const filePath = path.join(process.cwd(), 'public', 'locales', lang, `${namespace}.json`)
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data)
    } catch {
        return {}
    }
}
