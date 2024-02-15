import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";

import { TodosAdapterService } from "../services/todos-adapter.service";
import {
    CreateTodo,
    CreateTodoSuccess,
    CreateTodoFailure,
    LoadTodos,
    LoadTodosSuccess,
    LoadTodosFailure,
    TodoActionTypes
} from './todo.actions';

@Injectable()
export class TodoEffects {
    constructor(
        private actions: Actions,
        private todosAdapter: TodosAdapterService,
    ) { }

    loadTodos$ = createEffect(() => this.actions.pipe(
        ofType(LoadTodos),
        switchMap(() => this.todosAdapter.getTodos().pipe(
            map(todos => LoadTodosSuccess({ todos })),
            catchError(error => of(LoadTodosFailure({ error })))
        ))
    ));


    createTodo$ = createEffect(() => this.actions.pipe(
        ofType(CreateTodo),
        switchMap(action => this.todosAdapter.createTodo(action.data).pipe(
            map(todo => CreateTodoSuccess({ todo })),
            map(() => ({ type: TodoActionTypes.loadTodos })),
            catchError(error => of(CreateTodoFailure({ error })))
        ))
    ));

    // error handling
    createTodoFailure$ = createEffect(() => this.actions.pipe(
        ofType(CreateTodoFailure),
        tap((action) => {
            alert(action.error)
        })
    ), { dispatch: false });
}