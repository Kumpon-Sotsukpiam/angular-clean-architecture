import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { MockDbService } from './mock.service'

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(MockDbService, { delay: 300 }),
    ],
    providers: [
        MockDbService
    ],
})
export class MockDataModule { }