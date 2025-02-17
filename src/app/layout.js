import '@/app/css/app.css'
import '@/app/css/edit.css'

export const metadata = {
    title: 'TimeWorX',
    icons: {
        icon: '/logo-small.svg',
    },
    link: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        },
    ],
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    )
}

export default RootLayout
