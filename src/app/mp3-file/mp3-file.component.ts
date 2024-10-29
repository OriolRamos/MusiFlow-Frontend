import { Component, OnInit } from '@angular/core';
import { Mp3FileService } from './mp3-file.service';
import { Mp3File } from './mp3-file.model';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-mp3-file',
  templateUrl: './mp3-file.component.html',
  styleUrls: ['./mp3-file.component.css'],
  standalone: true,
  imports: [CommonModule] // Afegeix altres mòduls que puguis necessitar aquí, si cal
})
export class Mp3FileComponent implements OnInit {
  mp3Files: Mp3File[] = []; // Array per a guardar els fitxers MP3
  newFile: Mp3File = {
    id: 0,
    title: '',
    artist: '',
    album: '',
    year: 0,
    genre: '',
    fileUrl: ''
  }; // Objecte per al nou fitxer MP3
  loading: boolean = true; // Estat de càrrega
  selectedFile: File | null = null; // Variable per guardar el fitxer seleccionat

  constructor(private mp3FileService: Mp3FileService) {}

  ngOnInit(): void {
    this.getMp3Files();
  }

  getMp3Files(): void {
    this.loading = true; // Activa l'estat de càrrega
    this.mp3FileService.getMp3Files().subscribe((files) => {
      this.mp3Files = files;
      this.loading = false; // Desactiva l'estat de càrrega
    }, () => {
      this.loading = false; // Desactiva l'estat de càrrega en cas d'error
    });
  }

  // Funció per manejar la selecció de fitxer
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Funció per pujar el fitxer seleccionat al backend
  uploadFile(): void {
    this.mp3FileService.uploadMp3File(this.newFile).subscribe((file) => {
      this.mp3Files.push(file);
      this.newFile = { id: 0, title: '', artist: '', album: '', year: 0, genre: '', fileUrl: '' };
    });
  }

  // Funció per recarregar els fitxers des del backend
  reloadFiles(): void {
    this.getMp3Files();
  }

  // Funció buida per reproduir un fitxer (a implementar)
  reproduir(file: Mp3File): void {
    // Implementació futura per reproduir el fitxer
    console.log('Reproduint:', file);
  }

  // Funció buida per aturar la reproducció d'un fitxer (a implementar)
  aturar(file: Mp3File): void {
    // Implementació futura per aturar el fitxer
    console.log('Aturant:', file);
  }
}
