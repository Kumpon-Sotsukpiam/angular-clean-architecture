import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { TodosAdapterService } from './todos-adapter.service'
import { CreateTodoDto } from '@data/dtos'
import { todosQuery } from '@store/todo/todo.selectors'
import { CreateTodo, LoadTodos } from '@store/todo/todo.actions'
import { TodosState } from '@store/todo/todos.reducer'

@Injectable({
    providedIn: 'root',
})
export class TodosFacadeService {

    todos$ = this.store.select(todosQuery.getAllTodos)
    todosLoaded$ = this.store.select(todosQuery.getLoaded)

    constructor(
        private store: Store<TodosState>,
        private readonly todosAdapterService: TodosAdapterService
    ) { }

    getTodos() {
        this.store.dispatch(LoadTodos())
    }

    createTodo(data: CreateTodoDto) {
        console.log("🚀 ~ TodosFacadeService ~ data:", data)
        this.store.dispatch(CreateTodo({ data }))
    }
}