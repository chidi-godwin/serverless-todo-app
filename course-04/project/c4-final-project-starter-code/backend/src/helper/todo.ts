import { TodoItem } from "src/models/TodoItem";
import { TodoAccess } from "src/dataAccess/todoAccess";
import { parseUserId } from "src/auth/utils";
import { CreateTodoRequest } from "src/requests/CreateTodoRequest";

import * as uuid from 'uuid'

const todoAccess = new TodoAccess()
const s3BucketName = process.env.TODO_BUCKET
export async function getAllTodo(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodo(userId);
}

export async function createTodo(req: CreateTodoRequest, token: string): Promise<TodoItem> {
    const userId =  parseUserId(token);
    const todoId = uuid.v4();

    return todoAccess.createTodo({
        userId: { S: userId},
        todoId: { S: todoId},
        createdAt: { S: new Date().toISOString() },
        done: { BOOL: false},
        attachmentUrl: { S: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`},
        ...req
    })
}