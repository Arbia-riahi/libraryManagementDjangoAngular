import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';





import { BackofficeRoutingModule } from './backoffice-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';





import { LivresComponent } from './livres/livres.component';
import { UsersComponent } from './users/users.component';
import { AjouterlivreComponent } from './ajouterlivre/ajouterlivre.component';
import { ModifierlivreComponent } from './modifierlivre/modifierlivre.component';
import { AjouterusersComponent } from './ajouterusers/ajouterusers.component';
import { ModifierusersComponent } from './modifierusers/modifierusers.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    
   
   
   
       
         LivresComponent,
         UsersComponent,
         AjouterlivreComponent,
         ModifierlivreComponent,
         AjouterusersComponent,
         ModifierusersComponent
       

   
  ],
  imports: [
    CommonModule,
    RouterModule,
   
    FormsModule, // nécessaire pour [(ngModel)]
    BackofficeRoutingModule,
    ReactiveFormsModule, // ✅ OBLIGATOIRE
  ],
  providers: []
})
export class BackofficeModule { }






