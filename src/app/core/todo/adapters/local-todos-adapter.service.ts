import { Injectable } from '@angular/core'
import { delay, mergeMap, Observable, of, throwError } from 'rxjs'
import { v4 as getUuid } from 'uuid'
import {
    TodoNotFoundError,
    TodosAdapterService,
} from '../services/todos-adapter.service'
import { CreateTodoDto } from '../dtos/create-todo.dto'
import { Todo } from '../interfaces/types'

export interface LocalStorageData {
    todos: Todo[]
}

export const DELAY_MS = 100

@Injectable()
export class LocalTodosAdapterService extends TodosAdapterService {
    private probabilityOfFailure = 0

    constructor() {
        super()
        this.enableConsoleCommands()
    }

    createTodo(createTodo: CreateTodoDto): Observable<Todo> {
        return new Observable<Todo>((subscriber) => {
            const id = getUuid()
            const todo: Todo = {
                ...createTodo,
                id,
                status: 'pending',
            }

            if (this.isResponseFailed()) {
                setTimeout(() => {
                    const error = new Error('Failed to create')
                    subscriber.error(error)
                }, DELAY_MS)
            } else {
                const data = this.getData()
                data.todos.push(todo)
                this.saveData(data)

                subscriber.next(todo)
                subscriber.complete()
            }
        }).pipe(delay(DELAY_MS))
    }

    deleteTodo(id: string): Observable<void> {
        return new Observable((subscriber) => {
            const data = this.getData()
            data.todos = data.todos.filter((it) => it.id !== id)
            this.saveData(data)

            subscriber.next()
            subscriber.complete()
        })
    }

    getTodoByUuid(id: string): Observable<Todo | null> {
        return new Observable<Todo | null>((subscriber) => {
            const data = this.getData()
            const todo = data.todos.find((it) => it.id === id)

            subscriber.next(todo ?? null)
            subscriber.complete()
        }).pipe(delay(DELAY_MS))
    }

    getTodos(): Observable<Todo[]> {
        return new Observable<Todo[]>((subscriber) => {
            const data = this.getData()
            subscriber.next(data.todos)
            subscriber.complete()
        }).pipe(delay(DELAY_MS))
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return new Observable<Todo>((subscriber) => {
            try {
                this.updateTodoInStorage(todo)
            } catch (err: unknown) {
                subscriber.error(err)
                return
            }

            subscriber.next(todo)
            subscriber.complete()
        }).pipe(delay(DELAY_MS))
    }

    updateTodoStatus(id: string, status: 'pending' | 'done'): Observable<Todo> {
        return this.getTodoByUuid(id).pipe(
            mergeMap((todo) => {
                const todoNotFoundError$ = throwError(() => new TodoNotFoundError())
                if (!todo) {
                    return todoNotFoundError$
                }

                todo.status = status

                try {
                    this.updateTodoInStorage(todo)
                    return of(todo)
                } catch (err: unknown) {
                    return throwError(() => err)
                }
            })
        )
    }

    setProbilityOfFailure(probability: number) {
        this.probabilityOfFailure = probability
    }

    private updateTodoInStorage(todo: Todo) {
        const data = this.getData()

        const savedTodo = data.todos.find((it) => it.id === todo.id)
        if (!savedTodo) {
            throw new TodoNotFoundError()
        }

        const todoIndex = data.todos.indexOf(savedTodo)

        data.todos[todoIndex] = todo

        this.saveData(data)
    }

    private getData(): LocalStorageData {
        const data = localStorage.getItem('todos')
        if (!data) {
            return {
                todos: [],
            }
        }

        return JSON.parse(data)
    }

    private saveData(data: LocalStorageData) {
        localStorage.setItem('todos', JSON.stringify(data))
    }

    private enableConsoleCommands() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ; (window as any).clearTodos = () => {
            localStorage.removeItem('todos')
            window.location.reload()
        }
    }

    private isResponseFailed(): boolean {
        return Math.random() < this.probabilityOfFailure
    }
}