import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserofficeRoutingModule } from './useroffice-routing.module';
import { UserofficeComponent } from './useroffice.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LivresComponent } from './livres/livres.component';


@NgModule({
  declarations: [
    UserofficeComponent,
    DashboardUserComponent,
    LivresComponent
  ],
  imports: [
    CommonModule,
    UserofficeRoutingModule
  ]
})
export class UserofficeModule { }
