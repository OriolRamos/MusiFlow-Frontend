import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // Variable global
  private usuariActual: any;

  // Setter para actualizar la variable
  setGlobalVariable(value: any): void {
    this.usuariActual = value;
  }

  // Getter para obtener la variable
  getGlobalVariable(): any {
    return this.usuariActual;
  }
}
