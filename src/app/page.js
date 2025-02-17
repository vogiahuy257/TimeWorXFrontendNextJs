'use client'

import LoginLinks from '@/app/LoginLinks'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/auth'
import '@/app/css/welcome.css'

const page = () => {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <div id="welcome" className="min-h-screen">
            {/* Navigation Bar */}
            <LoginLinks user={user} />

            {/* Hero Section */}
            <section className="hero-welcome relative h-screen flex items-center justify-center text-center bg-gradient-to-b from-blue-50 to-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="z-10"
                >
                    <div className="flex justify-center items-center">
                        <h1 className="text-6xl font-bold mb-4">
                            Welcome to TimeWor
                            <span className="text-blue-800">X</span>
                        </h1>
                    </div>
                    <p className="text-gray-500 text-xl mb-8">
                        A place where creativity meets technology.
                    </p>
                    <div className="flex justify-center gap-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
                        >
                            Learn More
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-contact px-8 py-3 border-black rounded-full"
                        >
                            Contact Us
                        </motion.a>
                    </div>
                </motion.div>
                <motion.svg
                    initial={{ opacity: 0, x: 300, y: -300, rotate: 360 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: -360 }}
                    transition={{ duration: 1.3, ease: 'easeInOut' }}
                    className="be-cheese"
                />
            </section>

            {/* Main Content Section */}
            <main className="py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold mb-12 text-center"
                    >
                        Why Choose Us?
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Fast and Reliable',
                                description:
                                    'Our services are designed to be fast, reliable, and efficient.',
                            },
                            {
                                title: 'Professional Team',
                                description:
                                    'Our team is dedicated to delivering top-notch solutions with a professional approach.',
                            },
                            {
                                title: 'Customer Satisfaction',
                                description:
                                    'We prioritize customer satisfaction and work hard to meet your expectations.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                }}
                                className="bg-gray-50  p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-2xl font-semibold mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Developer Introduction Section */}
            <section id="about" className="py-24 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold mb-12 text-center"
                    >
                        Meet Our Developers
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            {
                                name: 'Võ Gia Huy',
                                role: 'Full Stack Developer',
                                bio: 'Alice is a passionate frontend developer with 5 years of experience in creating beautiful and responsive user interfaces.',
                            },
                            {
                                name: 'Lê Nguyễn Bảo Trân',
                                role: 'Business Analyst',
                                bio: 'Bob is an experienced backend developer who specializes in building scalable and efficient server-side applications.',
                            },
                        ].map((developer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                }}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <div className="flex items-center mb-4">

                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {developer.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            @{developer.role}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="text-gray-700">{developer.bio}</p> */}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-4 md:mb-0">
                        &copy; 2024 MyWebsite. All rights reserved.
                    </p>
                    {/* <div className="space-x-6">
                    <a className="text-white hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
                    <a className="text-white hover:text-gray-300 transition-colors duration-300">Terms of Service</a>
                </div> */}
                </div>
            </footer>
        </div>
    )
}

export default page
