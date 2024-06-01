import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import { Main } from "./site";

ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);
