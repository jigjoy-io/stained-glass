import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { retrievePageUseCase } from '@use-cases/retrieve-page'
import { updatePageUseCase } from '@use-cases/update-page'
import { retrievePagesUseCase } from '@use-cases/retrieve-pages'
import { uploadDocumentUseCase } from '@use-cases/upload-document'
import axios from 'axios'
import { createPageUseCase } from '@use-cases/create-page'


export async function migrateAssetsHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {

        let pages: any[] = ['92bf03be-00cb-4a1d-a0da-13ef9de2ae8d']

        const createNewBlock = async (block: any, folder: string) => {
            let b = JSON.parse(JSON.stringify(block))
            console.log(b)

            if (b.type == "carousel-tile" || b.type == "page-tile") {
                if (b.image && b.image.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                    const name = b.image.replace(/^.*[\\/]/, '')
                    b.image = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`

                }

                b.page = await createNewPage(b.page, folder)
            }
            else if (b.type == "profile") {
                if (b.image && b.image.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                    const name = b.image.replace(/^.*[\\/]/, '')
                    b.image = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
                }
            }
            else if (b.type == "image" && b.source.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                const name = b.source.replace(/^.*[\\/]/, '')
                b.source = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
            }

            else if (b.type == "audio" && b.source.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                const name = b.source.replace(/^.*[\\/]/, '')
                b.source = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
            }

            else if (b.type == "reel" && b.source.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                const name = b.source.replace(/^.*[\\/]/, '')
                b.source = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
            }

            else if (b.type == "question" && b.content && b.content.image && b.content.image.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                const name = b.content.image.replace(/^.*[\\/]/, '')
                b.content.image = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
            }

            else if (b.type == "message" && b.audio.startsWith('https://s3.eu-west-1.amazonaws.com/jigjoy.io')) {
                const name = b.audio.replace(/^.*[\\/]/, '')
                b.audio = `https://jigjoy-dev.s3.eu-west-1.amazonaws.com/assets/${folder}/${name}`
            }
            return b
        }

        const createNewPage = async (page: any, folder: string) => {
            let p: any = JSON.parse(JSON.stringify(page))

            if (p.type == "blank") {
                p.config = {
                    buildingBlocks: await Promise.all(page.config.buildingBlocks.map((b: any) => createNewBlock(b, folder)))
                }
            } else if (p.type == "carousel") {
                p.config = {
                    ...p.config,
                    pages: await Promise.all(page.config.pages.map((pg: any) => createNewPage(pg, folder)))
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]

            let page: any = await retrievePageUseCase(pageId)

            console.log(page)

            page = await createNewPage(page, pageId)

            console.log(page)

            await updatePageUseCase(page)
        }


        return {
            statusCode: 201,
            body: JSON.stringify({}),
        }

    } catch (error) {
        return errorHandler(error)
    }
}