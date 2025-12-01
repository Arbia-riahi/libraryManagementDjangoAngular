
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifierlivre',
  templateUrl: './modifierlivre.component.html',
  styleUrl: './modifierlivre.component.css'
})
export class ModifierlivreComponent implements OnInit {

livreForm!: FormGroup;
  imageFile?: File;
  livreId!: number;
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livreId = Number(this.route.snapshot.paramMap.get('id'));
  console.log("📌 ID reçu de l'URL :", this.livreId); // 👈 ajoute ça


    // Init formulaire vide
    this.livreForm = this.fb.group({
  titre: [''],
  auteur: [''],
  annee: [''],
  genre: [''],
  prix: [''] // 👈 ici
});


    // Charger le livre
    this.getLivre();
  }


getLivre(): void {
  this.http.get<any>(`http://localhost:8000/api/livres/${this.livreId}`)
    .subscribe({
      next: data => {
        console.log("✅ Données du livre :", data); // debug
        this.livreForm.patchValue({
          titre: data.titre,
          auteur: data.auteur,
          annee: data.annee,
          genre: data.genre,
          prix: data.prix  // 👈 ici aussi
        });
        if (data.imageUrl) {
          this.imageUrl = `http://localhost:8000/${data.imageUrl}`;
        }
      },
      error: err => {
        console.error("❌ Erreur récupération livre :", err);
      }
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
  const values = this.livreForm.value;

  formData.append('id', this.livreId.toString());
  if (values.titre?.trim()) formData.append('titre', values.titre);
  if (values.auteur?.trim()) formData.append('auteur', values.auteur);
  if (values.annee) formData.append('annee', values.annee);
  if (values.genre?.trim()) formData.append('genre', values.genre);
  if (values.prix) formData.append('prix', values.prix);
  if (this.imageFile) formData.append('image', this.imageFile);

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.put(
    `http://localhost:8000/api/livres/${this.livreId}`,
    formData,
    { headers }
  ).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: '✅ Succès',
        text: 'Livre mis à jour avec succès !',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['backoffice/livres']);
      });
    },
    error: err => {
      console.error("❌ Erreur de mise à jour :", err);
      Swal.fire({
        icon: 'error',
        title: '❌ Erreur',
        text: 'Échec de la mise à jour. Veuillez vérifier votre autorisation.',
        confirmButtonColor: '#d33'
      });
    }
  });
}



}





