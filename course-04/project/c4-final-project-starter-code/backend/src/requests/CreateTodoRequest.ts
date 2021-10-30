import { AttributeValue } from "@aws-sdk/client-dynamodb";

/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  name: AttributeValue
  dueDate: AttributeValue
}
