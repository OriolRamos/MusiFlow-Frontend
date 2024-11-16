import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaginaIdemComponent } from './pagina-idem/pagina-idem.component'; // Asegúrate de crear este componente

export const routes: Routes = [
  { path: '', component: AppComponent },  // Ruta principal
  { path: 'pagina-idem', component: PaginaIdemComponent }  // Ruta para otra página
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas para toda la aplicación
  exports: [RouterModule]  // Exporta el RouterModule para usarlo en otros módulos
})
export class AppRoutingModule { }



