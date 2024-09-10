import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { errorHandler } from '@packages/apigw-error-handler'
import { ReturnPageDto } from '@dto/page/page'
import Responses from '@utils/api-responses'
import { publishPageUseCase } from '@use-cases/publish-page'


export async function publishPageHandler({
    pathParameters
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {

        if (!pathParameters || !pathParameters?.id)
            throw new ValidationError('no id in the path parameters of the event')

        const { id } = pathParameters

        console.log(`reqested publish page: ${id}`)

        const pages: ReturnPageDto [] = await publishPageUseCase(id)

        console.log(`page published: ${JSON.stringify(pages)}`)

        return Responses._201(pages)

    } catch (error) {
        return errorHandler(error)
    }
}