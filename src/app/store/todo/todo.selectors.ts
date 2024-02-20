import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer'

const getTodosState = createFeatureSelector<TodosState>('todos');

const getLoaded = createSelector(getTodosState, (state: TodosState) => state.loaded);
const getAllTodos = createSelector(getTodosState, getLoaded, (state: TodosState, isLoaded: boolean) => {
    return isLoaded ? state.list.map((_state) => ({ ..._state, short_id: _state.id.slice(0, 8) })) : []
});
const getTodosSize = createSelector(getTodosState, (state: TodosState) => state.list.length);

export const todosQuery = {
    getLoaded,
    getAllTodos,
    getTodosSize
}