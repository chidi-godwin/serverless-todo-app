import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { createLogger } from "@libs/logger";
import { getUploadUrl } from "src/helper/todo";

const logger = createLogger('get upload url')

const handler: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    logger.info('Processing Event')

    const todoId = event.pathParameters.todoId;
    const URL = await getUploadUrl(todoId)

    return formatJSONResponse({
        body: {
            uploadUrl: URL
        }
    })
}

export const main = middyfy(handler)