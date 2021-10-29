import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

interface Response {
  headers?: Record<string, string>,
  body: any;
  statusCode?: number;
}
export const formatJSONResponse = (response: Response) => {
  return {
    headers: response.headers || {
      'Access-Control-Allow-Origin': '*'
  },
    statusCode: response.statusCode || 200,
    body: JSON.stringify(response.body)
  }
}