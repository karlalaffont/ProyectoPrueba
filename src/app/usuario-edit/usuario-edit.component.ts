import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../mock-ususario';
import { ServicioService } from '../servicios';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuarios: any[] = Usuarios;
  usuarioForm!: FormGroup;
  subjectArray = [];
  SectioinArray: any = ['Avior', 'PDVSA', 'Pepsi', 'Coca cola'];
  ngOnInit() {
    this.submitDatosForm();
    this.LoadForm();
  }

  constructor(
    public fb: FormBuilder,
    private service: ServicioService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  LoadForm() {
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
console.log(id);
    const data = this.usuarios.find(d => d.Id === id);

    this.usuarioForm = this.fb.group({
      fullName: [data.Nombre, [Validators.required]],
      nationalIdentity: [+data.Cedula, [Validators.required]],
      birthDate: [ data.FechaNacimiento, [Validators.required]],
      email: [data.Email, [Validators.required]],
      phone: [data.Telefono, [Validators.required]],
      organitation: [data.Organizacion],
    });

    /* 
         this.service.GetUsuario(id).subscribe((data) => {     
          this.subjectArray = data.subjects;
          this.usuarioForm = this.fb.group({
            fullName: [data.fullName, [Validators.required]],        
            birthDate: [data.birthDate, [Validators.required]],
            email: [data.email, [Validators.required]],
            phone: [data.phone, [Validators.required]],
            organitation: [data.organitation],
          });
        });  */
  }


  /* Reactive Datos form */
  submitDatosForm() {
    this.usuarioForm = this.fb.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      organitation: ['To select'],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };


  /* Update datos */
  submitUsuarioForm() {
    console.log(this.usuarioForm.value);
    var id = Number(this.activateRoute.snapshot.paramMap.get('id')) ;

    const usuario = this.usuarios;

    const indexOfObject = usuario.findIndex(object => {
      return object.Id === id;
    });

    this.usuarios.splice(indexOfObject, 1);
        
    const useradd = {
      Id: id,
      Nombre: this.usuarioForm.get('fullName')?.value,
      Cedula: +this.usuarioForm.get('nationalIdentity')?.value,
      Email: this.usuarioForm.get('email')?.value,
      Telefono: +this.usuarioForm.get('phone')?.value,
      Organizacion: +this.usuarioForm.get('organitation')?.value
    };

    this.usuarios.push(useradd);

    this.router.navigateByUrl('/usuario-list');

    //if (window.confirm('Are you sure you want to update?')) {
    /*  this.service
       .update(id, this.usuarioForm.value)
       .subscribe((res: any) => {
         this.router.navigateByUrl('/employees-list');
       }); */
    // } 
  }
}