
import '@/app/css/app.css'
import '@/app/css/edit.css'



const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                
                <link rel="icon" type="image/png" href="image/logo-small.svg"/>
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    )
}

export const metadata = {
    title: 'TimeWorX',
}

export default RootLayout
