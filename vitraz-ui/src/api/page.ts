import { v4 as uuidv4 } from "uuid"

// --- In-memory mock store (replaces backend) ---
const pagesById = new Map<string, any>()
const publishedById = new Map<string, any>()

function createMockBlock(type: string, overrides: Record<string, any> = {}) {
	return { id: uuidv4(), type, ...overrides }
}

function seedMockPages(origin: string): any[] {
	const blankWithBlocks = {
		id: "mock-blank-blocks",
		type: "blank",
		name: "Blank with building blocks",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [
				createMockBlock("h1", { text: "Welcome" }),
				createMockBlock("h2", { text: "Section heading" }),
				createMockBlock("text", { text: "Some body text here." })
			],
		},
	}

	const blankMinimal = {
		id: "mock-blank-minimal",
		type: "blank",
		name: "Minimal blank",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [createMockBlock("block-selector")],
		},
	}

	const richPage = {
		id: "mock-rich",
		type: "blank",
		name: "Rich content page",
		environment: "development",
		linkedPageId: null,
		origin,
		config: {
			buildingBlocks: [
				createMockBlock("h1", { text: "Learn something" }),
				createMockBlock("block-selector"),
			],
		},
	}

	return [blankWithBlocks, blankMinimal, richPage]
}

function ensureMockPages(origin: string): any[] {
	const existing = Array.from(pagesById.values()).filter((p) => p.origin === origin)
	if (existing.length > 0) return existing
	const pages = seedMockPages(origin)
	pages.forEach((p) => pagesById.set(p.id, JSON.parse(JSON.stringify(p))))
	return Array.from(pagesById.values()).filter((p) => p.origin === origin)
}

export async function getPage(id: string) {
	const page = pagesById.get(id)
	if (page) return JSON.parse(JSON.stringify(page))
	// Return first mock page so designer doesn't break when opening by id
	const anyOrigin = "mock@local"
	ensureMockPages(anyOrigin)
	const first = pagesById.values().next().value
	return first ? JSON.parse(JSON.stringify(first)) : null
}

export async function getPages() {
	const key = "mock@local"
	const pages = ensureMockPages(key)
	return pages.map((p) => JSON.parse(JSON.stringify(p)))
}

export async function createPage(page: any) {
	const copy = JSON.parse(JSON.stringify(page))
	pagesById.set(copy.id, copy)
	return copy
}

export async function updatePage(page: any) {
	const copy = JSON.parse(JSON.stringify(page))
	pagesById.set(copy.id, copy)
	return copy
}

export async function removePage(id: string) {
	pagesById.delete(id)
	publishedById.delete(id)
	return { success: true }
}
