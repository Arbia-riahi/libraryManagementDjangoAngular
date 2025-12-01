import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nom', this.registerForm.value.nom);
    formData.append('prenom', this.registerForm.value.prenom);
    formData.append('email', this.registerForm.value.email);
    formData.append('telephone', this.registerForm.value.telephone);
    formData.append('password', this.registerForm.value.password);

    this.auth.register(formData).subscribe({
      next: () => {

         Swal.fire({
          icon: 'success',
          title: 'Compte créé !',
          text: 'Votre compte a été créé avec succès.',
          confirmButtonText: 'Se connecter'
        }).then(() => {
          this.router.navigate(['/login']);
        });
       
      },
      error: () => {
       
 Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "L'inscription a échoué. Veuillez réessayer."
        });


        
      }
    });
  }
}
