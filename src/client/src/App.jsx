import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { LogProvider } from "./context/LogContext";
import { SheetProvider } from "./context/SheetContext";
import { BoothMapProvider } from "./context/BoothMapContext";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import Welcome from "./components/dashboard/Welcome";
import Assignment from "./components/dashboard/Assignment";
import Documentation from "./components/dashboard/Documentation";
import LogPage from "./components/dashboard/LogPage";

const AppRoutes = () => {
	// const { loading } = useAuth();

	// if (loading) {
	// 	return (
	// 		<div className="flex items-center justify-center min-h-screen bg-gray-100">
	// 			<div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
	// 			<span className="ml-2 text-gray-700">Loading...</span>
	// 		</div>
	// 	);
	// }

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />

			<Route path="/dashboard" element={<Dashboard />}>
				<Route index element={<Welcome />} />
				<Route path="assignment" element={<Assignment />} />
				<Route path="documentation" element={<Documentation />} />
				<Route path="log" element={<LogPage />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

const App = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			<Router>
				<LogProvider>
					<SheetProvider>
						<BoothMapProvider>
							<AppRoutes />
						</BoothMapProvider>
					</SheetProvider>
				</LogProvider>
			</Router>
		</div>
	);
};

export default App;
