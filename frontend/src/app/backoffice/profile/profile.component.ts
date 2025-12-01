import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  imageFile?: File;
  imageUrl: string = '';
  userId!: number;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8000/api/utilisateurs/me', { headers })
      .subscribe(user => {
        this.userId = user.id;
        this.imageUrl = `http://localhost:8000/${user.photoUrl}`;
        this.profileForm.patchValue(user);
      });

    this.profileForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      password: ['']
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

onSubmit(): void {
  const formData = new FormData();
  const values = this.profileForm.value;

  if (values.nom) formData.append('nom', values.nom);
  if (values.prenom) formData.append('prenom', values.prenom);
  if (values.email) formData.append('email', values.email);
  if (values.telephone) formData.append('telephone', values.telephone);
  if (values.password) formData.append('password', values.password);
  if (this.imageFile) formData.append('photo', this.imageFile);

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.put(`http://localhost:8000/api/utilisateurs/${this.userId}`, formData, { headers })
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '✅ Succès',
          text: 'Profil mis à jour avec succès !',
          confirmButtonText: 'OK'
        }).then(() => {
          // ⟳ Recharge la page
          window.location.reload();
        });
      },
      error: () => {
        Swal.fire('❌ Erreur', 'Impossible de mettre à jour le profil.', 'error');
      }
    });
}

}
