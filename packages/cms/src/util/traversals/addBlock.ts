
function addToBlankPage(page: any, payload: any) {

    let { referenceBlock, block, position } = payload

    let referenceBlockIndex = page.buildingBlocks.findIndex((b: any) => b.id == referenceBlock)
    let index = (position === 'above') ? referenceBlockIndex : referenceBlockIndex + 1
    page.buildingBlocks.splice(index, 0, block)


    return page
}

function addToCarouselPage(page: any, payload: any) {

    let { referenceBlock, block, position } = payload

    for (let i = 0; i < page.pages.length; i++) {

        let referenceBlockIndex = page.pages[i].buildingBlocks.findIndex((b: any) => b.id == referenceBlock)

        if (referenceBlockIndex != -1) {
            let index = (position === 'above') ? referenceBlockIndex : referenceBlockIndex + 1
            page.pages[i].buildingBlocks.splice(index, 0, block)
            return page
        }
    }

    return page
}
export function addBlock(page: any, payload: any) {

    if (page.type == 'blank') {
        page = addToBlankPage(page, payload)
    } else if (page.type == 'carousel') {
        page = addToCarouselPage(page, payload)
    }
    return page
}