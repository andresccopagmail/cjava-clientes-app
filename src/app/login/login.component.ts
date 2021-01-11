import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
import { AppConstants } from '../util/app.constants';
import { Auth } from './auth';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Login"
  auth: Auth = new Auth()

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem(AppConstants.Session.HAS_SESSION)) {
      this.router.navigate(['/home/clientes']);
    }
  }

  login(): void {
    this.authService.login(this.auth).subscribe(
      auth => {
        sessionStorage.setItem(AppConstants.Session.HAS_SESSION, JSON.stringify(true));
        sessionStorage.setItem(AppConstants.Session.AUTH, JSON.stringify(auth));
        this.router.navigate(['/home/clientes'])
        swal.fire('Login', `Logeado con éxito!`, 'success')
      },
      error => {
        swal.fire('Login', `Credenciales erroneas`, 'error')
      }
    )
  }

}
