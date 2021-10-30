import { AttributeValue } from "@aws-sdk/client-dynamodb";

export interface TodoItem {
  [key: string]: AttributeValue

}

