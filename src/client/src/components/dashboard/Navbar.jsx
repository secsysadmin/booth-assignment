import { Fragment, useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	// const [dropdownOpen, setDropdownOpen] = useState(false);
	// const dropdownRef = useRef(null);

	const navLinks = [
		{ name: "Assignment", path: "/dashboard/assignment" },
		{ name: "Documentation", path: "/dashboard/documentation" },
		{ name: "Log", path: "/dashboard/log" },
	];

	// const toggleDropdown = () => {
	// 	setDropdownOpen((prev) => !prev);
	// };

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
	// 			setDropdownOpen(false);
	// 		}
	// 	};
	// 	window.addEventListener("click", handleClickOutside);

	// 	return () => {
	// 		window.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []);

	return (
		<header className="p-4 flex justify-between relative">
			<a className="flex items-center gap-1">
				<img
					src="https://sec.tamu.edu/images/secbasic.png"
					className="h-8 invert-[0.75]"
				></img>
			</a>

			<div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-lg shadow-gray-400">
				{navLinks.map((link, index) => (
					<Fragment key={link.path}>
						<NavLink
							to={link.path}
							className={({ isActive }) =>
								isActive
									? "text-blue-600 font-bold border-b-2 border-blue-600"
									: " hover:text-blue-600"
							}
						>
							{link.name}
						</NavLink>
						{index < navLinks.length - 1 && (
							<div className="border-l border-gray-300 mx-2 h-5"></div>
						)}
					</Fragment>
				))}
			</div>

			<div className="flex gap-2 rounded-full py-2 px-4 max-w-[45vw]">
				<span
					className="text-3xl uppercase tracking-wider py-[2px] rounded-[12px] text-right w-full"
					style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
				>
					Booth Assignment
				</span>
			</div>
		</header>
	);
};

export default Navbar;
