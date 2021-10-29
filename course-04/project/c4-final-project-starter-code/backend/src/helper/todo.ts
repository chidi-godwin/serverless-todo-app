import { TodoItem } from "src/models/TodoItem";
import { TodoAccess } from "src/dataAccess/todoAccess";
import { parseUserId } from "src/auth/utils";

const todoAccess = new TodoAccess()
export async function getAllTodo(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodo(userId);
}


