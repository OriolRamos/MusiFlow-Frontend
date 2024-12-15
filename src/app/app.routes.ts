import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { PaginaIdemComponent } from './pagina-idem/pagina-idem.component'; // Asegúrate de crear este componente
import { PresentacioComponent } from './presentacio/presentacio.component';

export const routes: Routes = [
  {path: 'presentacio', component: PresentacioComponent},
  { path: 'app', component: AppComponent, canActivate: [AuthGuard]},  // Ruta principal
  { path: 'pagina-idem', component: PaginaIdemComponent }  // Ruta para otra página
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas para toda la aplicación
  exports: [RouterModule]  // Exporta el RouterModule para usarlo en otros módulos
})
export class AppRoutingModule { }



