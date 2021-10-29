import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { getAllTodo } from "src/helper/todo";

const getTodos: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

    const authorization = event.headers.Authorization
    const jwtToken = authorization.split(' ')[1]

    const todos = await getAllTodo(jwtToken);

    return formatJSONResponse({
        body: {
            items: todos
        }
    })
}

export const main = middyfy(getTodos);