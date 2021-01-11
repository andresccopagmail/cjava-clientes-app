import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './home/clientes/clientes.component';
import { FormComponent } from './home/form/form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'clientes', component: ClientesComponent },
      { path: 'clientes/form', component: FormComponent },
      { path: 'clientes/form/:id', component: FormComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
