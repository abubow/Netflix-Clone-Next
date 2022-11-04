import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
const Header = () => {
    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <header
            className={`${
                isScroll && "bg-[#141414] shadow-md"
            }`}
        >
            <div className="flex items-center space-x-2 md:space-x-10">
            <Image
                src="https://svgshare.com/i/niz.svg"
                alt="logo"
                width={120}
                height={60}
                className="cursor-pointer object-contain"
                />
                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">TV Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>
            
            <div className="flex items-center space-x-4 text-sm font-light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden sm:inline w-6 h-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg>
                <p className="hidden lg:inline">Kids</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                </svg>
                <Link href="/account">
                    <img
                    src="https://i.ibb.co/PctzB1n/AAAABbme8-JMz4r-EKFJhtzp-OKWFJ-6q-X-0y5ww-Wy-Yv-Bh-WS0-VKFLa289d-Z5zv-RBggm-FVWVPL2-AAYE8xev-D4jj-LZ.png"
                    className="cursor-pointer rounded"
                    alt="profile"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
