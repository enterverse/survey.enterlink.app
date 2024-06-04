import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Terms } from "./pages/terms";

import "./index.scss";

const router = createBrowserRouter([
	{
		path: "/terms",
		Component: () => <Terms />
	},
	{
		path: "*",
		Component: () => <Home />
	}
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
