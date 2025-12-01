import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        // stocker le token
        localStorage.setItem('token', res.token);

        // récupérer le rôle
        const role = this.auth.getRole();

        // afficher le rôle avec SweetAlert
        Swal.fire({
          title: 'Bienvenue!',
          text: `Connecté en tant que ${role}`,
          icon: 'success',
          confirmButtonText: 'Continuer'
        }).then(() => {
          if (role === 'admin') {
            this.router.navigate(['/backoffice']);
          } else if (role === 'user') {
            this.router.navigate(['/useroffice']);
          } else {
            this.errorMessage = 'Rôle non autorisé.';
            this.auth.logout(); // sécurité
          }
        });
      },

      error: () => this.errorMessage = 'Email ou mot de passe incorrect'
    });
  }
}
