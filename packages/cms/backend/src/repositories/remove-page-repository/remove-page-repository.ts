import { deletePage } from "@adapters/secondary/database-adapter"

export async function removePage(
	id: any,
	linkedPageId?: any
): Promise<void> {

	return await deletePage(id, linkedPageId)
}
