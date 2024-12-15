import { NgModule , Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule } from '@angular/forms'; // Formularis reactius
import { Router } from '@angular/router';  // Importa el Router
import { AuthService} from '../services/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-pagina-idem',
  standalone: true,
  templateUrl: './pagina-idem.component.html', // Enllaça automàticament al fitxer HTML
  styleUrls: ['./pagina-idem.component.css'],
  imports: [ReactiveFormsModule] // Importa els mòduls necessaris per a formularis
})
export class PaginaIdemComponent implements OnInit {
  // Variables del component
  titulo: string;
  formulario: FormGroup;
  isFlipped = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService) {
    // Inicialitza el títol
    this.titulo = 'Bienvenido a la otra página';

    // Crea el formulari reactiu
    this.formulario = this.fb.group({
      campo1: [''], // Exemple d'un camp de text inicialitzat buit
      campo2: ['']  // Un altre camp de text
    });
  }

  ngOnInit(): void {
    // Lògica d'inicialització
    console.log(`${this.titulo} se ha cargado correctamente.`);
  }

  // Mètode per gestionar l'enviament del formulari
  enviarFormulario(): void {
    console.log('Datos del formulario:', this.formulario.value);
  }

  flip(state: boolean): void {
    this.isFlipped = state;
  }

  
  irAOtraPagina() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);  // Usa el router para navegar
    }
  }

  login() {
    this.authService.login();  // Aquí usas el token para simular el login
  } 
}
