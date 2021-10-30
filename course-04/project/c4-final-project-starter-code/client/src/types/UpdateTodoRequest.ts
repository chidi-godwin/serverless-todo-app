export interface UpdateTodoRequest {
  task: { S: string }
  dueDate: { S: string }
  done: { BOOL: boolean }
}