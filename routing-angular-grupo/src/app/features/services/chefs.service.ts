import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChefsInterface } from '../interfaces/chefs.interface';

@Injectable({
  providedIn: 'root',
})

export class ChefsService {

  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getChefs() {
    return this.http.get<ChefsInterface[]>(`${this.apiUrl}/chefs`);
  }

  getChefById(id: string) {
    return this.http.get<ChefsInterface>(`${this.apiUrl}/chefs/${id}`);
  }

  createChef(chef: any) {
    return this.http.post(`${this.apiUrl}/chefs`, chef);
  }

  updateChef(id: string, chef: any) {
    return this.http.put(`${this.apiUrl}/chefs/${id}`, chef);
  }

  deleteChef(id: string) {
    return this.http.delete(`${this.apiUrl}/chefs/${id}`);
  }

}