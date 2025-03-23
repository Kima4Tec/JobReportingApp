import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://localhost:7061/api/company';

  constructor(private http: HttpClient) { }


  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, company);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateCompany(id: number, company: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, company);
  }

}