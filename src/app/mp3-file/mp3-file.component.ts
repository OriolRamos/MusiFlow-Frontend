import { Component, OnInit } from '@angular/core';
import { Mp3FileService } from './mp3-file.service';
import { Mp3File } from './mp3-file.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-mp3-file',
  templateUrl: './mp3-file.component.html',
  styleUrls: ['./mp3-file.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
})
export class Mp3FileComponent implements OnInit {
  mp3Files: Mp3File[] = []; // Array per a guardar els fitxers MP3
  uploadForm: FormGroup; // Formulari per pujar fitxers
  loading: boolean = true; // Estat de càrrega
  selectedFile: File | null = null; // Variable per guardar el fitxer seleccionat
  errorMessage: string | null = null; // Missatge d'error
  showModal: boolean = false; // Estat del modal

  constructor(private mp3FileService: Mp3FileService, private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.uploadForm = this.formBuilder.group({
      title: [''],
      artist: [''],
      album: [''],
      year: [null],
      genre: [''],
    });
  }

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
    console.log("File selected");
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check if the file is an MP3 and if it’s within the 10MB size limit
      const isMp3 = file.type === 'audio/mpeg' || file.name.endsWith('.mp3');
      const isWithinSizeLimit = file.size <= 200 * 1024 * 1024; // 200MB

      if (isMp3 && isWithinSizeLimit) {
        this.selectedFile = file;
        this.errorMessage = null;
      } else if (!isMp3) {
        this.selectedFile = null;
        this.errorMessage = 'El fitxer seleccionat no és un fitxer MP3. Si us plau, selecciona un fitxer vàlid.';
      } else if (!isWithinSizeLimit) {
        this.selectedFile = null;
        this.errorMessage = 'El fitxer és massa gran. Si us plau, selecciona un fitxer de menys de 200 MB.';
      }
    } else {
      this.selectedFile = null;
      this.errorMessage = null;
    }
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

  // Funció per recarregar els fitxers des del backend
  reloadFiles(): void {
    this.getMp3Files();
  }

  deleteFile(file: Mp3File): void {
    this.mp3FileService.deleteMp3File(file.id).subscribe(() => {
      this.mp3Files = this.mp3Files.filter(f => f.id !== file.id); // Elimina el fitxer de la llista local
    });
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('title', this.uploadForm.get('title')?.value || '');
      formData.append('artist', this.uploadForm.get('artist')?.value || '');
      formData.append('album', this.uploadForm.get('album')?.value || '');
      formData.append('year', this.uploadForm.get('year')?.value?.toString() || ''); // Envia "" si és null
      formData.append('genre', this.uploadForm.get('genre')?.value || '');

      this.mp3FileService.uploadMp3File(formData).subscribe(
        (file) => {
          this.mp3Files.push(file);
          this.uploadForm.reset();
          this.selectedFile = null;
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

}
