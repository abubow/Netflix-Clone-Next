import Image from "next/image"
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings"

interface Props{
    netflixOriginals: Movie[]
}
const Banner = ({netflixOriginals}: Props) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length - 1)])
    }, [netflixOriginals])
    console.log(movie)
    return (
        <div>
            <div className="absolute top-0 left-0 w-full h-[] bg-gradient-to-b from-gray-900/10 to-[#010511] z-[-1]">
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt="poster"
                    width={1920}
                    height={1080}
                    className="z-0 w-full h-[95vh] object-cover z-[-1]"   
                />
            </div>
        </div>
    )
}

export default Banner
