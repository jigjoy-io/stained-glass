import { removePage } from "@repositories/remove-page-repository"

export async function removePageUseCase(id: string, linkedPageId?: string): Promise<void> {
    return await removePage(id, linkedPageId)
}