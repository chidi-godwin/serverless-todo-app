export interface Todo {
  todoId: { S : string }
  createdAt: { S: string }
  task: {S: string }
  dueDate: { S : string }
  done: { BOOL: boolean }
  attachmentUrl?: {S: string }
}
