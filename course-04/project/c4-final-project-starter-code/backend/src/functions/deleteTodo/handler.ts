import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createLogger } from "@libs/logger";
import { deleteTodo } from "src/helper/todo";

const logger = createLogger('deleteTodo')

const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    logger.info('Processing Event', event)

    const authorization = event.headers.Authorization
    const token = authorization.split(' ')[1]

    const todoId = event.pathParameters.todoId

    await deleteTodo(todoId, token);

    return formatJSONResponse({
        body: '',
    })
}

export const main = middyfy(handler)