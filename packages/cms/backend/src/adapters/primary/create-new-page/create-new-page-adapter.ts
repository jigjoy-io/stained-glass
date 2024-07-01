import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ValidationError } from '@errors/validation-error'
import { v4 as uuid } from 'uuid'
import { createNewPageUseCase } from '@use-cases/create-new-page'
import { errorHandler } from '@packages/apigw-error-handler'
import { CreatePageDto, ReturnPageDto } from '@dto/page/page'
import { schema } from '@schemas/create-page.schema'
import { schemaValidator } from '@packages/schema-validator'

/**
 * Handles the creation of a new page based on the provided request body.
 * @param {APIGatewayProxyEvent} event - The API Gateway event containing the request body.
 * @returns {Promise<APIGatewayProxyResult>} A promise that resolves to an API Gateway response with the created page details.
 * @throws {ValidationError} If the request body is empty.
 */
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

		console.log(`${prefix} - page created: ${JSON.stringify(createdPage)}`)

		return {
			statusCode: 200,
			body: JSON.stringify(createdPage),
		}

	} catch (error) {
		return errorHandler(error)
	}
}