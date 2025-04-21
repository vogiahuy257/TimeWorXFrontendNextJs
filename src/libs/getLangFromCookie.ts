// lib/getLangFromCookie.ts
import { cookies } from 'next/headers'

export function getLangFromCookie(): string {
    const lang = cookies().get('lang')?.value
    return lang ?? 'vi' // fallback
}
