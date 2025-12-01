import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterusers',
  templateUrl: './ajouterusers.component.html',
  styleUrl: './ajouterusers.component.css'
})
export class AjouterusersComponent {

userForm: FormGroup;
  imageFile?: File;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.userForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      password: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.imageFile = file;
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.userForm.value;

    formData.append('nom', values.nom);
    formData.append('prenom', values.prenom);
    formData.append('email', values.email);
    formData.append('telephone', values.telephone);
    formData.append('password', values.password);
    if (this.imageFile) formData.append('photo', this.imageFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8000/api/utilisateurs', formData, { headers })
      .subscribe({
        next: () => {
          Swal.fire('Succès', 'Utilisateur ajouté avec succès.', 'success')
            .then(() => this.router.navigate(['/backoffice/users']));
        },
  error: (err) => {
  if (err.status === 400 && err.error?.email) {
    Swal.fire('❌ Email déjà utilisé', err.error.email[0], 'warning');
  } else {
    Swal.fire('Erreur', "Erreur lors de l'ajout de l'utilisateur", 'error');
  }
}


      });
  }

  annuler(): void {
    this.router.navigate(['/backoffice/users']);
  }
}

