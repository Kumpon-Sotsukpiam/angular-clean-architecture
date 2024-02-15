import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer'

const getTodosState = createFeatureSelector<TodosState>('todos');

const getLoaded = createSelector(getTodosState, (state: TodosState) => state.loaded);
const getAllTodos = createSelector(getTodosState, getLoaded, (state: TodosState, isLoaded: boolean) => {
    return isLoaded ? state.list : []
});

export const todosQuery = {
    getLoaded,
    getAllTodos
}