import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Main } from "./site";
import { Terms } from "./terms";

import "./index.scss";

const router = createBrowserRouter([
	{
		path: "/terms",
		Component: () => <Terms />
	},
	{
		path: "*",
		Component: () => <Main />
	}
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
