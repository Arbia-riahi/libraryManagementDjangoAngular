import { Component } from '@angular/core';
import { LivreService } from '../../services/livre.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterlivre',
  templateUrl: './ajouterlivre.component.html',
  styleUrl: './ajouterlivre.component.css'
})
export class AjouterlivreComponent {
  livre = {
    titre: '',
    auteur: '',
    annee: 0,
    genre: '',
    prix: 0
  };
  selectedImage!: File;

  constructor(private livreService: LivreService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('titre', this.livre.titre);
    formData.append('auteur', this.livre.auteur);
    formData.append('annee', this.livre.annee.toString());
    formData.append('genre', this.livre.genre);
    formData.append('prix', this.livre.prix.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.livreService.ajouterLivre(formData).subscribe({
      next: () => {
        Swal.fire('Succès', 'Livre ajouté avec succès !', 'success').then(() => {
          this.router.navigate(['backoffice/livres']);
        });
      },
      error: () => {
        Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
      }
    });
  }

}




