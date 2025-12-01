import { Component, OnInit } from '@angular/core';
import { LivreService, Livre } from '../../services/livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.css'
})
export class LivresComponent implements OnInit{
  livres: Livre[] = [];

  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.livreService.getAll().subscribe({
      next: (data) => this.livres = data,
      error: (err) => console.error("Erreur chargement livres", err)
    });
  }

}





