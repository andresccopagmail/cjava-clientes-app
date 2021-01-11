import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlEndPoint: string = 'http://localhost:8080/api/auth';

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  login(auth: Auth): Observable<Auth> {
    return this.http.post<Auth>(`${this.urlEndPoint}/login` , auth, { headers: this.httpHeaders })
  }

}
