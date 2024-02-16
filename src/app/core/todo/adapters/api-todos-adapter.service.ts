import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TodosAdapterService } from '../services/todos-adapter.service'
import { Todo } from '../interfaces/types'
import { CreateTodoDto } from '../dtos'

@Injectable()
export class ApiTodosAdapterService extends TodosAdapterService {
    // private functionsUrl = 'http://localhost:8000'
    baseUrl = "/api/todos";

    constructor(private http: HttpClient) {
        super()
    }

    createTodo(createTodo: CreateTodoDto): Observable<Todo> {
        return this.http.post<Todo>(this.baseUrl, createTodo)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteTodo(id: string): Observable<void> {
        return throwError('Not Implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTodoByUuid(id: string): Observable<Todo | null> {
        return throwError('Not Implemented')
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.baseUrl)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTodo(todo: Todo): Observable<Todo> {
        return throwError('Not Implemented')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateTodoStatus(id: string, status: 'pending' | 'done'): Observable<Todo> {
        return throwError('Not Implemented')
    }
}