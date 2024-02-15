import { Todo } from "../interfaces/types";

export type CreateTodoDto = Omit<Todo, 'id' | 'status'>
