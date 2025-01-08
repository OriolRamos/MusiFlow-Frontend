import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Mp3FileService } from './mp3-file.service';
import { Mp3File } from './mp3-file.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { UserService } from '../services/user.service';
import { User } from '../services/user.service';
import {MusicPlayerComponent} from '../music-player/music-player.component';  // Importa el Router
import {Validators } from '@angular/forms';

@Component({
  selector: 'app-mp3-file',
  templateUrl: './mp3-file.component.html',
  styleUrls: ['./mp3-file.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MusicPlayerComponent], // Add ReactiveFormsModule here
})
export class Mp3FileComponent implements OnInit {
  mp3Files: Mp3File[] = []; // Array per a guardar els fitxers MP3
  uploadForm: FormGroup; // Formulari per pujar fitxers
  loading: boolean = true; // Estat de càrrega
  selectedFile: File | null = null; // Variable per guardar el fitxer seleccionat
  errorMessage: string | null = null; // Missatge d'error
  showModal: boolean = false; // Estat del modal
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>; // Referencia al elemento audio
  @ViewChild(MusicPlayerComponent) musicplayer!:MusicPlayerComponent;
  audioSource: string = '';
  currentUser: User | null = null;
  selectedFileName: string = 'In_Vain.mp3';

  constructor(private mp3FileService: Mp3FileService, private formBuilder: FormBuilder, private userService: UserService) {
    // Initialize the form in the constructor
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: [''],
      album: [''],
      year: [null],
      genre: [''],
    });
  }

  ngOnInit(): void {
    this.getMp3Files();
    this.currentUser = this.userService.getUser();

    this.selectedFileName = 'In_Vain.mp3';

  }

  getMp3Files(): void {
    this.loading = true; // Activa l'estat de càrrega
    const userName = this.userService.getUser()?.userName;
    console.log(this.userService.getUser()?.songs);

    if (userName) {
      this.userService.getUserSogs(userName).subscribe((songs) => {
        this.mp3Files = songs;
        this.loading = false;
      });
    } else {
      console.error("No user is logged in.");
      this.loading = false;
    }
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
    console.log('Reproduint:', file);

    this.musicplayer.playAudio(file.id + '.mp3');
  }

  // Funció buida per aturar la reproducció d'un fitxer (a implementar)
  aturar(): void {
    this.musicplayer.pauseAudio();
  }
  // Funció per recarregar els fitxers des del backend
  reloadFiles(): void {
    this.getMp3Files();
  }

  deleteFile(file: Mp3File): void {
    console.log('Deleting file');

    const formData = new FormData();
    formData.append('id', file.id);
    formData.append('user', JSON.stringify(this.currentUser));

    // Crida al servei per eliminar la cançó i passar l'ID de l'usuari
    this.mp3FileService.deleteMp3File(formData).subscribe(
      (response) => {
        console.log('Fitxer eliminat: ', response);
        // Elimina el fitxer de la llista local només si el backend ha retornat una resposta d'èxit
        this.mp3Files = this.mp3Files.filter(f => f.id !== file.id);
        this.reloadFiles();
      },
      (error) => {
        console.error('Error deleting file:', error);
        this.reloadFiles();
      }
    );

  }


  // Component TS (exemple)
  getUniqueFiles() {
    // Filtrar els fitxers perquè només es mostrin els únics per ID
    return this.mp3Files.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id // Comprova que l'ID sigui únic
        ))
    );
  }
  uploadFile(): void {
    console.log('Uploading file');
    if (this.selectedFile) {  // Comprovem si selectedFile no és null ni undefined
      const formData = new FormData();

      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('title', this.uploadForm.get('title')?.value || '');
      formData.append('artist', this.uploadForm.get('artist')?.value || '');
      formData.append('album', this.uploadForm.get('album')?.value || '');
      formData.append('year', this.uploadForm.get('year')?.value?.toString() || ''); // Envia "" si és null
      formData.append('genre', this.uploadForm.get('genre')?.value || '');
      formData.append('user', JSON.stringify(this.currentUser));

      this.mp3FileService.uploadMp3File(formData).subscribe(
        (file) => {
          console.log('Fitxer MP3 pujat correctament:', file); // Afegeix una línia per comprovar la resposta al frontend
          this.mp3Files.push(file); // Afegeix el fitxer pujat a la llista de fitxers

          // Mostra totes les dades de l'objecte Mp3File
          console.log('Dades del fitxer MP3:', file);
          console.log('Id: ' + file.id);
          console.log('Títol: ' + file.title);
          console.log('Artista: ' + file.artist);
          console.log('Àlbum: ' + file.album);
          console.log('Any: ' + file.year);
          console.log('Gènere: ' + file.genre);
          console.log('URL del fitxer: ' + file.fileUrl);

          // Aquí canvien el nom del fitxer abans de pujar-lo a Cloudflare utilitzant l'ID
          const fileId = file.id; // Utilitzem l'ID retornat del backend

          if (this.selectedFile) {  // Comprovem que selectedFile no sigui null
            const renamedFile = new File([this.selectedFile], `${fileId}.mp3`, { type: this.selectedFile.type });

            // Ara pugem el fitxer renombrat a Cloudflare
            this.mp3FileService.uploadToCloudflare(renamedFile).subscribe(
              (response) => {
                console.log('Fitxer pujat correctament a Cloudflare:', response);
                this.uploadForm.reset();
                this.selectedFile = null; // Reiniciem l'estat
              },
              (error) => {
                console.error('Error en pujar a Cloudflare:', error);
              }
            );
          } else {
            console.error('No selected file.');
          }

          // Reinicia el formulari i l'arxiu seleccionat
          this.uploadForm.reset();
          this.selectedFile = null;
          this.reloadFiles();
        },
        (error) => {
          console.error('Upload failed:', error);
          this.reloadFiles();
        }
      );
    } else {
      console.error('No file selected.');
    }
  }



}
