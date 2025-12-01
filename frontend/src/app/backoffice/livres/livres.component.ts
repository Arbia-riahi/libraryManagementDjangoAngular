import { Component, OnInit } from '@angular/core';
import { LivreService, Livre } from '../../services/livre.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css'
})
export class LivresComponent implements OnInit{
  livres: Livre[] = [];
  filteredLivres: Livre[] = [];
  paginatedLivres: Livre[] = [];

  searchTerm: string = '';
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  http: any;

   

  constructor(private livreService: LivreService, private router: Router) {}

 ngOnInit(): void {
    this.livreService.getAll().subscribe({
      next: (data) => {
        // 🔁 Tri décroissant par ID (dernier d'abord)
        this.livres = data.sort((a, b) => b.id - a.id);
        this.filteredLivres = [...this.livres];
        this.updatePagination();
      },
      error: (err) => console.error("Erreur chargement livres", err)
    });
  }

 filterBooks() {
  const term = this.searchTerm.toLowerCase();

  this.filteredLivres = this.livres.filter(l =>
    l.titre.toLowerCase().includes(term) ||
    l.auteur.toLowerCase().includes(term) ||
    l.genre.toLowerCase().includes(term) ||
    l.id.toString().includes(term) ||
    (l.annee && l.annee.toString().includes(term))|| (l.prix && l.prix.toString().includes(term))
  );

  this.currentPage = 1;
  this.updatePagination();
}


  updatePagination() {
    this.totalPages = Math.ceil(this.filteredLivres.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedLivres = this.filteredLivres.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  ajouterLivre() {
    this.router.navigate(['backoffice/livres/ajouter']);
  }

  modifierLivre(id: number) {
    this.router.navigate(['backoffice/livres/modifier', id]);
  }

 supprimerLivre(id: number): void {
  Swal.fire({
    title: '🗑️ Supprimer le livre ?',
    text: 'Cette action est irréversible !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then(result => {
    if (result.isConfirmed) {
      this.livreService.deleteLivre(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '✅ Supprimé',
            text: 'Le livre a été supprimé avec succès.'
          });

          // Supprime localement et met à jour la pagination
          this.livres = this.livres.filter(l => l.id !== id);
          this.filterBooks();
        },
        error: (err) => {
          console.error("Erreur de suppression :", err);
          Swal.fire({
            icon: 'error',
            title: '❌ Erreur',
            text: 'Impossible de supprimer ce livre. Vérifie les droits.'
          });
        }
      });
    }
  });
}



}












