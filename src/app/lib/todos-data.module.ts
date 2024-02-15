import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalTodosAdapterService } from './adapters/local-todos-adapter.service'
// import { ApiTodosAdapterService } from './adapters/api-todos-adapter.service'
import { TodosAdapterService } from './services/todos-adapter.service'
import { TodosDataService } from './services/todos-data.service'
import { TodosFacadeService } from './services/todos-facade.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
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