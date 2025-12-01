import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './services/auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path:'logout',component:LogoutComponent},

  {
    path: 'backoffice',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./backoffice/backoffice.module').then(m => m.BackofficeModule)
  },
  { path: 'useroffice', loadChildren: () => import('./useroffice/useroffice.module').then(m => m.UserofficeModule) },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
