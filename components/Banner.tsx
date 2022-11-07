import Image from "next/image";
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
	netflixOriginals: Movie[];
}
const Banner = ({ netflixOriginals }: Props) => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useState<Movie | null>(null);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	useEffect(() => {
		setMovie(
			netflixOriginals[
				Math.floor(Math.random() * netflixOriginals.length - 1)
			]
		);
	}, [netflixOriginals]);
	console.log(movie);
	return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
			<div className="absolute top-0 left-0 w-full h-[] bg-gradient-to-b from-gray-900/10 to-[#010511] z-[-1]">
				<Image
					src={`${baseUrl}${
						movie?.backdrop_path || movie?.poster_path
					}`}
					alt="poster"
					width={1920}
					height={1080}
					className="w-full h-[95vh] object-cover z-[-1]"
				/>
			</div>
			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{movie?.title || movie?.name || movie?.original_name}
			</h1>
			<p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{movie?.overview}
			</p>
			<div className="flex space-x-3">
				<button className="bannerButton bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button
					className="bannerButton bg-[gray]/70 text-white"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-5 h-5 md:w-8 md:h-8">
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
							clipRule="evenodd"
						/>
					</svg>
					More Info
				</button>
			</div>
		</div>
	);
};

export default Banner;
