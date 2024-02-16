import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { TodosState } from '../store/todos.reducer'
import { todosQuery } from '../store/todo.selectors'
import { CreateTodo, LoadTodos } from '../store/todo.actions'
import { CreateTodoDto } from '../dtos'
import { TodosAdapterService } from './todos-adapter.service'
// import { BehaviorSubject, map, Observable } from 'rxjs'

// import { TodosAdapterService } from './todos-adapter.service'
// import { CreateTodoDto } from '../dtos/create-todo.dto'
// import { TodosDataService } from './todos-data.service'
// import { todos$ } from '../todos.repository'
// import { Todo } from '../interfaces/types'


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

    // todos$: Observable<Todo[]> = todos$
    // doneTodos$: Observable<Todo[]> = this.todos$.pipe(
    //     map((todos) => todos.filter((it) => it.status === 'done'))
    // )
    // activeTodos$: Observable<Todo[]> = this.todos$.pipe(
    //     map((todos) => todos.filter((it) => it.status === 'pending'))
    // )
    // todosNumber$: Observable<number> = this.activeTodos$.pipe(
    //     map((todos) => todos.length)
    // )

    // private todosLoadedSubject = new BehaviorSubject<boolean>(false)

    // todosLoaded$ = this.todosLoadedSubject.asObservable()

    // constructor(
    //     private todosAdapter: TodosAdapterService,
    //     private todosData: TodosDataService
    // ) { }

    // getTodos(): Observable<Todo[]> {
    //     const todos$ = this.todosData.getTodos()

    //     todos$.subscribe(() => this.todosLoadedSubject.next(true))

    //     return todos$
    // }

    // getTodoByUuid(uuid: Todo['uuid']): Observable<Todo | null> {
    //     return this.todosAdapter.getTodoByUuid(uuid)
    // }

    // createTodo(data: CreateTodoDto): Observable<Todo> {
    //     const todo$ = this.todosData.createTodo(data)

    //     todo$.subscribe()

    //     return todo$
    // }

    // deleteTodo(uuid: Todo['uuid']): Observable<void> {
    //     const result$ = this.todosData.deleteTodo(uuid)

    //     result$.subscribe()

    //     return result$
    // }

    // updateTodo(todo: Todo): Observable<Todo> {
    //     const todo$ = this.todosAdapter.updateTodo(todo)

    //     todo$.subscribe()

    //     return todo$
    // }

    // updateTodoStatus(
    //     uuid: Todo['uuid'],
    //     status: Todo['status']
    // ): Observable<Todo> {
    //     const todo$ = this.todosData.updateTodoStatus(uuid, status)

    //     todo$.subscribe()

    //     return todo$
    // }
}