import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router"
import { PageNotFound } from "./PageNotFound"
import React from "react"
import { NotFoundError } from "./NotFoundError"

export function PostError({ error }: ErrorComponentProps) {
	if (error instanceof NotFoundError) {
		return <PageNotFound message={error.message} />
	} else {
		return <ErrorComponent error={error} />
	}
}