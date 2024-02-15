import { createAction, props } from "@ngrx/store";
import { Todo } from "../interfaces/types";
import { CreateTodoDto } from "../dtos";

export enum TodoActionTypes {
    loadTodos = "[Todos] Load Todos",
    loadTodosSuccess = "[Todos] Load Todos Success",
    loadTodosFailure = "[Todos] Load Todos Failure",
    createTodo = "[Todo] Create Todo",
    createTodoSuccess = "[Todo] Create Todo Success",
    createTodoFailure = "[Todo] Create Todo Failure",
    deleteTodo = "[Todo] Delete Todo",
    deleteTodoSuccess = "[Todo] Delete Todo Success",
    deleteTodoFailure = "[Todo] Delete Todo Failure",
    // updateTodo = "[Todo] Update Todo",
    // updateTodoSuccess = "[Todo] Update Todo Success",
    // updateTodoFailure = "[Todo] Update Todo Failure",
}

// load todos action
export const LoadTodos = createAction(TodoActionTypes.loadTodos);

export const LoadTodosSuccess = createAction(TodoActionTypes.loadTodosSuccess, props<{ todos: Todo[] }>());

export const LoadTodosFailure = createAction(TodoActionTypes.loadTodosFailure, props<{ error: any }>());

// create todos action
export const CreateTodo = createAction(TodoActionTypes.createTodo, props<{ data: CreateTodoDto }>());

export const CreateTodoSuccess = createAction(TodoActionTypes.createTodoSuccess, props<{ todo: Todo }>());

export const CreateTodoFailure = createAction(TodoActionTypes.createTodoFailure, props<{ error: any }>());

// delete todos action
export const DeleteTodo = createAction(TodoActionTypes.deleteTodo, props<{ uuid: string }>());

export const DeleteTodoSuccess = createAction(TodoActionTypes.deleteTodoSuccess, props<{ uuid: string }>());

export const DeleteTodoFailure = createAction(TodoActionTypes.deleteTodoFailure, props<{ error: any }>());
