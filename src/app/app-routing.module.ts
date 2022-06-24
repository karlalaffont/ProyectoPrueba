
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioAddComponent } from './usuario-add/usuario-add.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioReadComponent } from './usuario-read/usuario-read.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'usuario-list' },
  { path: 'usuario-add', component: UsuarioAddComponent },
  { path: 'usuario-edit/:id', component: UsuarioEditComponent },
  { path: 'usuario-read', component: UsuarioReadComponent },
  { path: 'usuario-list', component: UsuarioListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
