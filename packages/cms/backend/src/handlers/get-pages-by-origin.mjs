import Responses from '../utils/api-responses.mjs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
const client = new DynamoDBClient({})
const ddbDocClient = DynamoDBDocumentClient.from(client)

const tableName = process.env.PAGE_TABLE

export const getPagesByOriginHandler = async (event) => {
  
	if (event.httpMethod !== 'GET') {
		throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`)
	}

	console.info('received:', event)

	const params = {
		KeyConditionExpression: 'origin = :origin',
		IndexName: 'pageGSI',
		ExpressionAttributeValues: {
			':origin': event.pathParameters.origin
		},
		TableName: tableName
	}

	const data = await ddbDocClient.send(new QueryCommand(params))
	let pages = data.Items
	
	const response = {
		statusCode: 200,
		body: pages
	}
	
	console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
	return Responses._200(response)
}
