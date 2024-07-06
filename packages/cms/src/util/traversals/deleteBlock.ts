
function deleteFromBlankPage(page: any, blockId: any) {
    page.buildingBlocks = page.buildingBlocks.filter((block: any) => block.id !== blockId)
    return page
}

function deleteFromCarouselPage(page: any, blockId: any) {

    for (let i = 0; i < page.pages.length; i++) {
        page.pages[i].buildingBlocks = page.pages[i].buildingBlocks.filter((b: any) => b.id !== blockId)
    }

    return page
}
export function deleteBlock(page: any, blockId: any) {

    if (page.type == 'blank') {
        page = deleteFromBlankPage(page, blockId)
    } else if (page.type == 'carousel') {
        page = deleteFromCarouselPage(page, blockId)
    }
    return page
}