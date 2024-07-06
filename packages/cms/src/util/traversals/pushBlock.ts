
function addToBlankPage(page: any, payload: any) {

    page.buildingBlocks.push(payload.block)
    return page
}

function addToCarouselPage(page: any, payload: any) {

    let { pageId, block } = payload

    for (let i = 0; i < page.pages.length; i++) {

        if (page.pages[i].id == pageId) {
            page.pages[i].buildingBlocks.push(block)
            return page
        }
    }

}
export function pushBlock(page: any, payload: any) {

    if (page.type == 'blank') {
        return addToBlankPage(page, payload)
    } else if (page.type == 'carousel') {
        return addToCarouselPage(page, payload)
    }
}