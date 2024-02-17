import { Todo } from "@data/interfaces";

export type CreateTodoDto = Omit<Todo, 'id' | 'status'>
