import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { Todo } from "../interfaces/types";
import { CreateTodo, CreateTodoFailure, CreateTodoSuccess, LoadTodos, LoadTodosFailure, LoadTodosSuccess } from "./todo.actions";

export interface TodosState {
    list: Todo[];
    selectedId?: string | number;
    loaded: boolean;
    error?: any;
}

export const initialState: TodosState = {
    list: [],
    loaded: false
};

const reducer: ActionReducer<TodosState> = createReducer(initialState,
    on(LoadTodos, CreateTodo, state => ({ ...state })),
    on(LoadTodos, state => ({ ...state })),
    on(LoadTodosSuccess, (state, { todos }) => ({ ...state, list: todos, loaded: true })),
    on(LoadTodosFailure, (state, { error }) => ({ ...state, error })),
    on(CreateTodo, state => ({ ...state })),
    on(CreateTodoSuccess, (state, { todo }) => ({ ...state, list: [...state.list, todo], loaded: true })),
    on(CreateTodoFailure, (state, { error }) => ({ ...state, error })),
)


export const todoReducer = (appState: TodosState, action: Action) => reducer(appState, action);