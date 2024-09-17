import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@packages/apigw-error-handler'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)
const tableName = process.env.PAGE_TABLE
import { v4 as uuid } from 'uuid'
import { createPageUseCase } from '@use-cases/create-page'

const fetchPage = async (pageId: string) => {
    const res : any = await fetch(`https://n9ruxi2ebf.execute-api.eu-west-1.amazonaws.com/Prod/${pageId}`)
    return (await res.json()).body

}

export async function migrateOldPagesHandler({
    body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let pages = ["01858c7d-17dc-4c64-93e2-f2df71f365zz", "48d7d761-f58e-4425-ac77-26a20e7813a6", "e5edf9f1-fdd6-4c84-b219-aab74abdml00", "hemijabm-83c9-45e4-bc78-eb9e6102home", "modernnomad-eb39-4850-a797-1f28b15fhome", "e5edf9f1-fdd6-4c84-b219-aab74abdjd00", "01858c7d-17dc-4c64-93e2-f2df71f3zzfp", "lazanja-9876-42bf-8aaf-60e3936fdecc"]

        const createNewBlock = async (block: any) => {
            let b = JSON.parse(JSON.stringify(block))
            b.id = uuid()
            if (b.type == "chapter") {
                
                b.type = 'carousel-tile'
                let p = await fetchPage(b.chapterId)
                b.page = await createNewPage(p)
                delete b.chapterId
                b.cta = 'Start'
            }else if (b.type == "image") {
                b.source = b.imageUrl
                delete b.imageUrl
            }else if (b.type == "question") {
                b.content.displayQuestion = true
                b.content.displayImage = true
                b.answers = b.answers.map((answer: any) => {
                    if(answer.id==b.correctAnswerId){
                        answer.correct = true
                    }
                        

                    answer.id = uuid()
                    return answer
                })

                delete b.correctAnswerId
                
                b.outcomes = {}
                b.outcomes.confirmationButtonText = 'Proveri odgovor'
                let correct = JSON.parse(JSON.stringify(b.correct))
                correct.id = uuid()
                b.outcomes.correct = correct
                delete b.correct

                let incorrect = JSON.parse(JSON.stringify(b.incorrect))
                correct.id = uuid()
                b.outcomes.incorrect = incorrect
                delete b.incorrect


            }

            return b
        }

        const refinePage = async (pageId: string) => {
            let p = await fetchPage(pageId)
            console.log(`fetched page: ${JSON.stringify(p)}`)
            return createNewPage(p)
        }

        const createNewPage = async (page: any) => {
            
            console.log(`kreira se novi page ${JSON.stringify(page)}`)
            let p: any = {}
            p.id = uuid()
            p.type = page.type
            p.origin = page.origin ? page.origin : "username"
            p.linkedPageId = null

            if (p.type == "blank") {
                p.name = 'Blank Page'
                p.config = {
                    buildingBlocks: await Promise.all(page.buildingBlocks.map(createNewBlock))
                }
            } else if (p.type == "chapter") {
                p.type = 'carousel'
                p.name = 'Carousel'
                p.config = {
                    pages: await Promise.all(page.pages.map(refinePage))
                }
            }


            return p

        }

        for (let i = 0; i < pages.length; i++) {
            let pageId = pages[i]
            console.log(`obradjuje se ${pageId}`)

            let page = await refinePage(pageId)
            console.log(`zavrsen page ${JSON.stringify(page)}`)

            await createPageUseCase(page)
        }


        return {
            statusCode: 201,
            body: JSON.stringify({}),
        }

    } catch (error) {
        return errorHandler(error)
    }
}