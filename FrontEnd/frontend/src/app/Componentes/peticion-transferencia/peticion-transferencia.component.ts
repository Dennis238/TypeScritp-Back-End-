import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AutorService} from "../../Servicios/autor.service";
import {UsuarioService} from "../../Servicios/usuario.service";
import {LibroService} from "../../Servicios/libro.service";
import {Usuario} from "../../Interfaces/usuario";

@Component({
  selector: 'app-peticion-transferencia',
  templateUrl: './peticion-transferencia.component.html',
  styleUrls: ['./peticion-transferencia.component.css'],
  providers: [AutorService,UsuarioService, LibroService]
})
export class PeticionTransferenciaComponent implements OnInit {

  usuario: Usuario;
  listaComida = [];
  listaIngredientes = [];
  usuarioActual: Usuario;

  constructor(private _activatedRoute: ActivatedRoute,
              private _comidaService: AutorService,
              private _usuarioService: UsuarioService,
              private _ingredienteService: LibroService
  ) {
    this._activatedRoute.params.subscribe(
      params =>{
        this.getUsuarioActualPorId(params['idUsuarioActual']);
        this.getUsuarioPorId(params['idUsuario']);
        this.getComidaPorUsuario(params['idUsuario']);
      });
  }
  ngOnInit() {
  }
  getUsuarioPorId(idUsuario) {
    this._usuarioService.getUsuarioPorId(idUsuario).subscribe(
      (result: any) => {
        this.usuario =  result[0];
      }
    )
  }
  getUsuarioActualPorId(idUsuario) {
    this._usuarioService.getUsuarioPorId(idUsuario).subscribe(
      (result: any) => {
        this.usuarioActual =  result[0];
      }
    )
  }
  getComidaPorUsuario(idUsuario) {
    this._comidaService.getComidasporUsuario(idUsuario).subscribe(
      (result: any[]) => {
        this.listaComida = result;
        this.getIngredientePorComida(this.listaComida[0].id);
      }
    );
  }
  getIngredientePorComida(idComida) {
    this._ingredienteService.getIngredientePorComida(idComida).subscribe(
      (result: any[]) => {
        this.listaIngredientes = result;
      }
    )
  }
}
