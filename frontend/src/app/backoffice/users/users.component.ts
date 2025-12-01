import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photoUrl: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  filteredUsers: Utilisateur[] = [];
  paginatedUsers: Utilisateur[] = [];

  searchTerm: string = '';
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  adminId!: number;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getMonProfil(() => this.chargerUtilisateurs());
  }

  getMonProfil(callback: () => void): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:8000/api/utilisateurs/me', { headers })
      .subscribe({
        next: user => {
          this.adminId = user.id;
          callback();
        },
        error: () => console.error("Erreur récupération utilisateur connecté")
      });
  }

  chargerUtilisateurs(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Utilisateur[]>('http://localhost:8000/api/utilisateurs', { headers })
      .subscribe({
        next: data => {
          this.utilisateurs = data
            .filter(u => u.id !== this.adminId)
            .sort((a, b) => b.id - a.id);
          this.filteredUsers = [...this.utilisateurs];
          this.updatePagination();
        },
        error: err => console.error('Erreur chargement utilisateurs', err)
      });
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.utilisateurs.filter(u =>
      u.nom.toLowerCase().includes(term) ||
      u.prenom.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.telephone.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  ajouterUser(): void {
    this.router.navigate(['backoffice/users/ajouter']);
  }

  modifierUser(id: number): void {
    this.router.navigate(['backoffice/users/modifier', id]);
  }

  supprimerUser(id: number): void {
    Swal.fire({
      title: '🗑️ Supprimer cet utilisateur ?',
      text: 'Cette action est irreversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.delete(`http://localhost:8000/api/utilisateurs/${id}`, { headers })
          .subscribe({
            next: () => {
              Swal.fire('Supprimé', 'Utilisateur supprimé avec succès.', 'success');
              this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
              this.filterUsers();
            },
            error: err => {
              console.error('Erreur suppression utilisateur :', err);
              Swal.fire('Erreur', 'Impossible de supprimer cet utilisateur.', 'error');
            }
          });
      }
    });
  }
}

