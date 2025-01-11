import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const Dashboard = () => {
	return (
		<div>
			<Navbar />

			<div className="p-4 flex justify-center">
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
