import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [RouterModule],
  providers: [],
  exports: [HeaderComponent, SidebarComponent],
  declarations: [HeaderComponent, SidebarComponent, MainLayoutComponent]
})
export class LayoutModule { }