// interventions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  sendDataToBackend(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const jsonData = JSON.stringify(data);
    return this.http.post(`${this.baseUrl}/save`, jsonData, httpOptions);
  }

  getSurgeons(start: any, end: any): Observable<any> {
    const params = new HttpParams()
    .set('start', start)
    .set('end', end);
    return this.http.get(`${this.baseUrl}/surgeons`, { params });
  }

}