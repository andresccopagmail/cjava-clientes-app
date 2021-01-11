import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente';
import { AppConstants } from 'src/app/util/app.constants';
import { Auth } from 'src/app/login/auth';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlEndPoint: string = 'http://localhost:8080/api/clientes';

  auth : Auth = JSON.parse(sessionStorage.getItem(AppConstants.Session.AUTH));

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth.token}`
  })

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint, { headers: this.httpHeaders }).pipe(
      map(response => response as Cliente[])
    );
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
  }

}
