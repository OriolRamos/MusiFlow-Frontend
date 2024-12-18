import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>; // Referencia al elemento audio
  audioSource: string = ''; // Fuente de audio
  fileName: string = '';
  constructor(private musicService: AudioService) {}

  ngOnInit() {
    // Aquí no cal carregar l'àudio per defecte, ja que ho faràs dinàmicament
    this.audioSource = ''; // Inicia el 'audioSource' buit.
  }

  playAudio(fileName: string) {
    // Carregar el fitxer d'àudio des del servei
    this.fileName = fileName;
    this.musicService.streamAudio(this.fileName).subscribe({
      next: (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'audio/mp3' });
        this.audioSource = URL.createObjectURL(blob); // Crear l'objecte URL per al fitxer d'àudio
        const audioPlayer = this.audioPlayerRef.nativeElement;
        audioPlayer.play().then(() => {
          console.log('Reproducció iniciada o reanudada');
        }).catch((error) => {
          console.error('Error al intentar reproduir l\'àudio:', error);
        });
      },
      error: (err) => {
        console.error('Error al carregar el fitxer d\'àudio:', err);
      }
    });
  }

  pauseAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.pause();
    console.log('Reproducción pausada');
  }

  restartAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.currentTime = 0; // Reinicia el tiempo de reproducción
    audioPlayer.play().then(() => {
      console.log('Reproducción reiniciada');
    }).catch((error) => {
      console.error('Error al intentar reiniciar el audio:', error);
    });
  }
}
