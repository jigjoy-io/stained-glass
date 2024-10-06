import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router"
import { PageNotFound } from "./page-not-found"
import React from "react"
import { NotFoundError } from "./not-found-error"

export function PostError({ error }: ErrorComponentProps) {
	if (error instanceof NotFoundError) {
		return <PageNotFound message={error.message} />
	} else {
		return <ErrorComponent error={error} />
	}
}