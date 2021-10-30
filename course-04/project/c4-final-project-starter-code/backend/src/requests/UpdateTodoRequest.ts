import {AttributeValue } from "@aws-sdk/client-dynamodb";

/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTodoRequest {
  task?: AttributeValue;
  done?: AttributeValue;
  dueDate?: AttributeValue;
}