import { createLazyFileRoute } from '@tanstack/react-router'
import Designer from "../pages/designer/designer"

export const Route: any = createLazyFileRoute("/designer" as never)({
    component: Designer
})


