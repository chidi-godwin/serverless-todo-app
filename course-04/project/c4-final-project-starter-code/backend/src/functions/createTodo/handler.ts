import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createTodo } from "src/helper/todo";
import schema from "./schema";
import { createLogger } from "@libs/logger";
import { CreateTodoRequest } from "src/requests/CreateTodoRequest";

const logger = createLogger('createTodo')

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    logger.info('Processing Event', event)

    const authorization = event.headers.Authorization
    const token = authorization.split(' ')[1]

    const newTodo: CreateTodoRequest = event.body
    const todo = await createTodo(newTodo, token);

    return formatJSONResponse({
        body: { item: todo },
        statusCode: 201
    })
}

export const main = middyfy(handler)
