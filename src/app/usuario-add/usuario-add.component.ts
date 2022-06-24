import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioService } from '../servicios';
import { Usuarios } from '../mock-ususario';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuarioForm!: FormGroup;
  subjectArray = [];
  SectioinArray: any = ['Avior', 'PDVSA', 'Pepsi', 'Coca cola'];

  usuarios: any[] = Usuarios;

  ngOnInit() {
    this.submitDatosForm();
  }

  constructor(
    public fb: FormBuilder, private service: ServicioService, private router: Router) { }

  /* Reactive datos form */
  submitDatosForm() {
    this.usuarioForm = this.fb.group({
      fullName: ['', [Validators.required,]],
      nationalIdentity: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      organitation: ['To select',[Validators.required]],
    });
  }

  /* Get errores */
  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };


  submitUsuarioForm() {
    console.log(this.usuarioForm.value);

    const countUser = this.usuarios.length;

    const useradd = {
      Id: countUser + 1,
      Nombre: this.usuarioForm.get('fullName')?.value,
      Cedula: +this.usuarioForm.get('nationalIdentity')?.value,
      Email: this.usuarioForm.get('email')?.value,
      Telefono: +this.usuarioForm.get('phone')?.value,
      Organizacion: this.usuarioForm.get('organitation')?.value,
      FechaNacimiento: this.usuarioForm.get('birthDate')?.value,
    };

    this.usuarios.push(useradd);

    this.router.navigateByUrl('/usuario-list');
    /*  this.service.create(this.usuarioForm.value)
       .subscribe((res: any) => {
         this.router.navigateByUrl('/usuario-list');
       }); */

  }
}



