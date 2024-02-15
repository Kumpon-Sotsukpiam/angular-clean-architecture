import { Observable } from 'rxjs'
import { Todo } from '../interfaces/types'
import { CreateTodoDto } from '../dtos'

export class TodoNotFoundError extends Error { }

export abstract class TodosAdapterService {
    abstract getTodos(): Observable<Todo[]>

    abstract getTodoByUuid(uuidid: string): Observable<Todo | null>

    abstract createTodo(todo: CreateTodoDto): Observable<Todo>

    abstract deleteTodo(id: string): Observable<void>

    /**
     * @throws TodoNotFoundError
     */
    abstract updateTodo(todo: Todo): Observable<Todo>

    /**
     * @throws TodoNotFoundError
     */
    abstract updateTodoStatus(
        id: string,
        status: Todo['status']
    ): Observable<Todo>
}
