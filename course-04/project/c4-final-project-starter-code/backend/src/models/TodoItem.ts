import { AttributeValue } from "@aws-sdk/client-dynamodb";

export interface TodoItem {
  userId?: AttributeValue.SMember
  todoId?: AttributeValue.SMember
  createdAt?: AttributeValue.SMember
  name?: AttributeValue.SMember
  dueDate?: AttributeValue.SMember
  done?: AttributeValue.BOOLMember
  attachmentUrl?: AttributeValue.SMember
}
