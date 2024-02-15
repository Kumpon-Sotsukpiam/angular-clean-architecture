import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LocalTodosAdapterService } from './adapters/local-todos-adapter.service'
// import { ApiTodosAdapterService } from './adapters/api-todos-adapter.service'
import { TodosAdapterService } from './services/todos-adapter.service'
import { TodosDataService } from './services/todos-data.service'
import { TodosFacadeService } from './services/todos-facade.service'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { initialState, todoReducer } from './store/todos.reducer'
import { EffectsModule } from '@ngrx/effects'
import { TodoEffects } from './store/todo.effects'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('todos', todoReducer, {
            initialState: initialState
        }),
        EffectsModule.forFeature([TodoEffects])
    ],
    providers: [
        {
            provide: TodosAdapterService,
            useClass: LocalTodosAdapterService,
        },
        TodosFacadeService,
        TodosDataService,
    ],
})
export class TodosDataModule { }