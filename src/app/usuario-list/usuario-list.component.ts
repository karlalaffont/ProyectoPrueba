import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios';
import { Usuarios } from '../mock-ususario';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {


  UsuarioData: any = Usuarios;

  displayedColumns: string[] = [
    'Cedula',
    'Nombre Completo',
    'Email',
    'Telefono',
    'Fecha de Nacimiento',
    'Organizacion',
    'Accion'
  ];

  constructor(private servicio: ServicioService) { }
  ngOnInit() {
    this.LoadUsuarios();

  }

  LoadUsuarios() {
    // this.servicio.list().subscribe((data: any) => {
    //   this.UsuarioData = data;
    // });

  }

  deleteStudent(e: { id: any; }) {
    if (window.confirm('¿Dedesea eliminar este usuario?')) {
      
      const usuario = this.UsuarioData;

      let idEl = e.id;
      const indexOfObject = usuario.findIndex((object: { Id: Number; }) => {
        return object.Id === idEl;
      });
  
      this.UsuarioData.splice(indexOfObject, 1);
     /*  
      this.servicio.delete(e.id).subscribe((data: any) =>
        this.LoadUsuarios()
      ); */
    }
  }
}
