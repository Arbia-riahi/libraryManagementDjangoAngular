import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LivresComponent } from './livres/livres.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardUserComponent,
    children: [
      { path: '', redirectTo: 'livres', pathMatch: 'full' },
      { path: 'livres', component: LivresComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserofficeRoutingModule {}

