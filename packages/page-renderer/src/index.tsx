import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./types/index.d.ts"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

rootDiv.render(
	<React.StrictMode>
		<div>Page Renderer</div>
	</React.StrictMode>,
)
