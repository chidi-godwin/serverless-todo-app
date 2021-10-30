import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createLogger } from "@libs/logger";
import { updateTodo } from "src/helper/todo";
import { UpdateTodoRequest } from "src/requests/UpdateTodoRequest";
import schema from "./schema";

const logger = createLogger('updateTodo')
const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
      logger.info('Processing Event', event)

      const authorization = event.headers.Authorization
      const token = authorization.split(' ')[1]

      const todoId = event.pathParameters.todoId
      const updatedTodo: UpdateTodoRequest = event.body

      const todoItem = await updateTodo(updatedTodo, todoId, token)

      return formatJSONResponse({
          body: { item: todoItem}
      })
}

export const main = middyfy(handler)