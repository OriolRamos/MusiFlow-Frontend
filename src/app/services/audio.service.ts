import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private apiBaseUrl = environment.apiBaseUri;

  constructor(private http:HttpClient) {}

  streamAudio(filename : string){
      const url = `${this.apiBaseUrl}/stream/${filename}`;
      return this.http.get(url, { responseType: 'arraybuffer' }); // Usa 'arraybuffer' para manejar datos binarios
  }
}
