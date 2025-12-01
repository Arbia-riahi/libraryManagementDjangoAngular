import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  annee: number;
  genre: string;
  prix: number;
  imageUrl: string;

}

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'http://localhost:8000/api/livres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Livre[]>(this.apiUrl, { headers });
  }

  ajouterLivre(formData: FormData) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(this.apiUrl, formData, { headers });
}

deleteLivre(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`${this.apiUrl}/${id}`, { headers });
}


}

