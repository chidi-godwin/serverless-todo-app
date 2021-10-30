import { AttributeValue } from "@aws-sdk/client-dynamodb";

export interface TodoUpdate {
  task?: AttributeValue;
  done?: AttributeValue;
  dueDate?: AttributeValue
}