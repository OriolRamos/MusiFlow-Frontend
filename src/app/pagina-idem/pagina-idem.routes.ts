import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaIdemComponent } from './pagina-idem.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';

export const routes: Routes = [
  { path: '', component: PaginaIdemComponent },  // Ruta principal
  { path: 'pagina-idem', component: PaginaIdemComponent },  // Ruta para otra página
  { path: 'login-modal', component: LoginModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas para toda la aplicación
  exports: [RouterModule]  // Exporta el RouterModule para usarlo en otros módulos
})
export class AppRoutingModule { }
