import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../clientes/cliente.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string = "Cliente"
  cliente: Cliente = new Cliente()

  isNew: boolean = true;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.isNew = false;
        this.clienteService.get(id).subscribe(cliente => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/home/clientes'])
        swal.fire('Nuevo cliente',`Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
      })
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/home/clientes'])
        swal.fire('Cliente actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
      })
  }

}
