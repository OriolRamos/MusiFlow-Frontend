import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Mp3FileComponent} from './mp3-file/mp3-file.component';
import { AuthService} from './services/auth.service';
import { RouterModule } from '@angular/router';
import { PaginaIdemComponent } from './pagina-idem/pagina-idem.component';
import { Router } from '@angular/router';
import {MusicPlayerComponent} from './music-player/music-player.component';  // Importa el Router




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, Mp3FileComponent, RouterModule, MusicPlayerComponent] // Afegeix els mòduls aquí
})

export class AppComponent {
  uploadForm: FormGroup;
  uploadedFiles: string[] = [];
  title = 'MusiFlow-Frontend';
  isAuthenticated: boolean = false;


  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({
        file: file
      });
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')?.value);

    this.http.post('/api/upload', formData).subscribe((response: any) => {
      this.uploadedFiles.push(response.fileName); // Assuming the response contains the file name
      this.uploadForm.reset(); // Reset the form
    });
  }

  loadFiles() {
    this.http.get<string[]>('/api/files').subscribe(files => {
      this.uploadedFiles = files;
    });
  }

  login() {
    this.authService.login();  // Aquí usas el token para simular el login
    this.isAuthenticated = true;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  irAOtraPagina() {
    this.router.navigate(['/presentacio']);  // Usa el router para navegar
  }
  // Método para manejar el cierre de sesión (opcional)

  obrirLogin() {
    this.router.navigate(['/login-modal']);
  }

}


