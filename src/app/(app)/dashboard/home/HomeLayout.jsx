
export default function HomeLayout({children})
{
    return(
        <section id="home" className="">
            {/* Meeting Header */}
            <div className="box box-header" />
            {children}
        </section>
    )
}