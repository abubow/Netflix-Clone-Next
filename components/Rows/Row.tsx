import { useRef, useState } from "react";
import { Movie } from "../../typings";
import Thumbnail from "./Thumbnail";

interface Props {
	title: string;
	movies: Movie[];
}
const Row = ({ title, movies }: Props) => {
	const rowRef = useRef<HTMLDivElement | null>(null);
	const [isMoved, setIsMoved] = useState(false);

	const handleArrowClick = (arrow: string) => {
		setIsMoved(true);

		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scrollTo =
				arrow === ">"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};
	return (
		<div className="h-40 space-y-0.5 md:space-y-2">
			<h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
				{title}
			</h2>
			<div className="group relative md:-ml-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					onClick={() => {
						handleArrowClick("<");
					}}
					className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
						!isMoved && "hidden"
					}`}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 19.5L8.25 12l7.5-7.5"
					/>
				</svg>
				<div
					className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 md:min-h-[20vh]"
					ref={rowRef}>
					{movies.map((movie) => (
						<Thumbnail
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					onClick={() => {
						handleArrowClick(">");
					}}
					className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 duration-100 ease-in-out">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.25 4.5l7.5 7.5-7.5 7.5"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Row;
