import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
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

  constructor(private musicService: AudioService) {}

  ngOnInit() {
    const fileName = 'In_Vain.mp3';

    // Cargar el archivo de audio desde el servicio
    this.musicService.streamAudio(fileName).subscribe({
      next: (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'audio/mp3' });
        this.audioSource = URL.createObjectURL(blob); // Crear el objeto URL
      },
      error: (err) => {
        console.error('Error al cargar el audio:', err);
      }
    });
  }
  
  

  playAudio() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.play().then(() => {
      console.log('Reproducción iniciada o reanudada');
    }).catch((error) => {
      console.error('Error al intentar reproducir el audio:', error);
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
