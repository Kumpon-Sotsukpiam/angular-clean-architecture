import { Todo } from "../interfaces/types";
import { TodoActionTypes } from "./todo.actions";

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

export function todoReducer(state = initialState, action: any): TodosState {
    console.log("🚀 ~ todoReducer ~ action:", action)
    console.log("🚀 ~ todoReducer ~ state:", state)
    switch (action.type) {
        case TodoActionTypes.loadTodos: {
            state = {
                ...state,
            };
            break
        }
        case TodoActionTypes.loadTodosSuccess: {
            state = {
                ...state,
                list: action.todos,
                loaded: true
            };
            break
        }
        case TodoActionTypes.createTodo: {
            state = {
                ...state,
            };
            break
        }
        default:
            return state;
    }
    console.log("🚀 ~ todoReducer ~ state:", state)
    return state;
}
