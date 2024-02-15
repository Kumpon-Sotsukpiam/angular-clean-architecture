import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { TodosAdapterService } from "../services/todos-adapter.service";
import { CreateTodo, LoadTodos, LoadTodosFailure, LoadTodosSuccess, TodoActionTypes } from './todo.actions';

@Injectable()
export class TodoEffects {
    constructor(
        private actions: Actions,
        private todosAdapter: TodosAdapterService,
    ) { }

    loadTodos$ = createEffect(() => this.actions.pipe(
        ofType(LoadTodos), // Listen for LoadTodos action
        switchMap(() => this.todosAdapter.getTodos().pipe(
            map(todos => LoadTodosSuccess({ todos })),
            // catchError(error => of(LoadTodosFailure({ error })))
        ))
    ));


    createTodo$ = createEffect(() => this.actions.pipe(
        ofType(CreateTodo), // Listen for CreateTodo action
        switchMap(action => this.todosAdapter.createTodo(action.data).pipe(
            map(() => ({ type: TodoActionTypes.loadTodos })),
            // catchError(error => of(new LoadTodosFailure({ error })))
        ))
    ));
}