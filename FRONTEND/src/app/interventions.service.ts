// interventions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  private baseUrl = 'http://localhost:3000'; // Remplacez avec votre URL de l'API

  constructor(private http: HttpClient) {}

  getInterventions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/interventions`);
  }
}
