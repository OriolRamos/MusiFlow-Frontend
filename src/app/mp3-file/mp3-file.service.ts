// mp3-file.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mp3File } from './mp3-file.model';
import {environment} from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Mp3FileService {
  private apiUrl = 'http://localhost:8080/api/mp3files';
  private apiUrlCloud = environment.apiBaseUri;
  constructor(private http: HttpClient) {}

  getMp3Files(): Observable<Mp3File[]> {
    return this.http.get<Mp3File[]>(this.apiUrl);
  }

  uploadMp3File(formData: FormData): Observable<Mp3File> {
    return this.http.post<Mp3File>(`${this.apiUrl}/upload`, formData);
  }

  uploadToCloudflare(file: File): Observable<string> {
    const url = `${this.apiUrlCloud}/upload`; // La URL donde se envía el archivo

    const formData = new FormData();
    formData.append('file', file);

    // Hacer la solicitud HTTP POST con FormData
    return this.http.post<string>(url, formData);
  }

  deleteMp3File(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
