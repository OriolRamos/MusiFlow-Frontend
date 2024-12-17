// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root' // Esto permite que Angular registre este servicio globalmente
})
export class AuthService {

  constructor() { }
  private authenticated = false; // Cambiar según la lógica real

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  // Método para simular el login (puedes adaptarlo a tu lógica real)
  login(): void {
    this.authenticated = true;
  }

  // Método para simular el logout
  logout(): void {
    this.authenticated = false;
  }
}
