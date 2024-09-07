import { createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createLazyFileRoute('/$pageId')({
  component: () => <div>Hello /$pageId!</div>
})