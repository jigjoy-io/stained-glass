import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { v4 as uuid } from 'uuid'
import { createNewPageUseCase } from '@use-cases/create-new-page'
import { errorHandler } from '@packages/apigw-error-handler'
import { CreatePageDto, ReturnPageDto } from '@dto/page/page'
import { schema } from '@schemas/create-page.schema'
import { schemaValidator } from '@packages/schema-validator'


export async function createNewPageHandler({
	body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

	try {
		const correlationId = uuid()
		const method = 'create-new-page.handler'
		const prefix = `${correlationId} - ${method}`

		if (!body) throw new ValidationError('No page body')

		const page: CreatePageDto = JSON.parse(body)

		schemaValidator(schema, page)

		console.log(`${prefix} - page: ${JSON.stringify(page)}`)

		const createdPage: ReturnPageDto = await createNewPageUseCase(page)

		return {
			statusCode: 200,
			body: JSON.stringify(createdPage),
		}

	} catch (error) {
		return errorHandler(error)
	}
}