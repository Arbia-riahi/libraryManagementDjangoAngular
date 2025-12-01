import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierusers',
  templateUrl: './modifierusers.component.html',
  styleUrl: './modifierusers.component.css'
})
export class ModifierusersComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  imageFile?: File;
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      password: ['']
    });

    this.chargerUtilisateur();
  }

  chargerUtilisateur(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:8000/api/utilisateurs/${this.userId}`, { headers })
      .subscribe({
        next: user => {
          this.userForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone
          });
          this.imageUrl = `http://localhost:8000/${user.photoUrl}`;
        },
        error: () => {
          Swal.fire('Erreur', "Utilisateur introuvable.", 'error');
        }
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.imageFile = file;
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.userForm.value;

    if (values.nom) formData.append('nom', values.nom);
    if (values.prenom) formData.append('prenom', values.prenom);
    if (values.email) formData.append('email', values.email);
    if (values.telephone) formData.append('telephone', values.telephone);
    if (values.password) formData.append('passwordHash', values.password);
    if (this.imageFile) formData.append('photo', this.imageFile);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`http://localhost:8000/api/utilisateurs/${this.userId}`, formData, { headers })
      .subscribe({
        next: () => {
          Swal.fire('Succès', 'Utilisateur modifié avec succès.', 'success')
            .then(() => this.router.navigate(['/backoffice/users']));
        },
        error: () => {
          Swal.fire('Erreur', 'Erreur lors de la modification.', 'error');
        }
      });
  }

  annuler(): void {
    this.router.navigate(['/backoffice/utilisateurs']);
  }
}







