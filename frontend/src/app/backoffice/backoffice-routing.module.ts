import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { LivresComponent } from './livres/livres.component';
import { AjouterlivreComponent } from './ajouterlivre/ajouterlivre.component';
import { ModifierlivreComponent } from './modifierlivre/modifierlivre.component';
import { UsersComponent } from './users/users.component';
import { AjouterusersComponent } from './ajouterusers/ajouterusers.component';
import { ModifierusersComponent } from './modifierusers/modifierusers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'livres', pathMatch: 'full' },

      { path: 'livres', component: LivresComponent },
      { path: 'livres/ajouter', component: AjouterlivreComponent },
      { path: 'livres/modifier/:id', component: ModifierlivreComponent },
      


      { path: 'users', component: UsersComponent },
      { path: 'users/ajouter', component: AjouterusersComponent },
      { path: 'users/modifier/:id', component: ModifierusersComponent },

      { path: 'profile', component: ProfileComponent },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule {}
