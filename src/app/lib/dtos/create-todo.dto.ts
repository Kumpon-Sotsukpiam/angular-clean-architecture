import { Todo } from "../interfaces/types";

export type CreateTodoDto = Omit<Todo, 'uuid' | 'status'>
