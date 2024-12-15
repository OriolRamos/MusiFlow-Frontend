import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Afegeix aquesta línia per a les sol·licituds HTTP
import { RouterModule, Routes } from '@angular/router';
import { PaginaIdemComponent } from './pagina-idem/pagina-idem.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'pagina-idem', component: PaginaIdemComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [] // Component d'arrencada principal
})
export class AppModule { }
