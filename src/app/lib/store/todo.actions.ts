import { createAction, props } from "@ngrx/store";
import { Todo } from "../interfaces/types";
import { CreateTodoDto } from "../dtos";

export enum TodoActionTypes {
    loadTodos = "[Todos] Load Todos",
    loadTodosSuccess = "[Todos] Load Todos Success",
    loadTodosFailure = "[Todos] Load Todos Failure",
    createTodo = "[Todo] Create Todo",
}

export const LoadTodos = createAction(TodoActionTypes.loadTodos);

export const CreateTodo = createAction(
    TodoActionTypes.createTodo,
    props<{ data: CreateTodoDto }>()
);

export const LoadTodosSuccess = createAction(
    TodoActionTypes.loadTodosSuccess,
    props<{ todos: Todo[] }>()
);

// Action dispatched when there's an error loading todos
export const LoadTodosFailure = createAction(
    TodoActionTypes.loadTodosFailure,
    props<{ error: any }>()
);

