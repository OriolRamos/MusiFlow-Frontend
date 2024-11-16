// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto permite que Angular registre este servicio globalmente
})
export class AuthService {

  constructor() { }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token'); // Aquí verificas si existe un token
    }
    return false;
  }
  
  

  // Método para simular el login (puedes adaptarlo a tu lógica real)
  login(username: string, password: string): void {
    //localStorage.setItem('authToken', token);
  }

  // Método para simular el logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
