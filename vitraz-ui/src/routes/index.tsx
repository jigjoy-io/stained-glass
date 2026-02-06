import { createFileRoute } from "@tanstack/react-router"
import Editor from "../editor/editor"

export const Route = createFileRoute("/")({
	component: Editor,
})
