import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'; // Formularis reactius

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

  constructor(private fb: FormBuilder) {
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
}
