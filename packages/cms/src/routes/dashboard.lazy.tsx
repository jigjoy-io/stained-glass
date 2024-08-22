import { createLazyFileRoute } from "@tanstack/react-router"
import Dashboard from "../pages/dashboard/Dashboard"

export const Route: any = createLazyFileRoute("/dashboard")({
    component: Dashboard
})