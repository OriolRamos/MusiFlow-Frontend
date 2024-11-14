// mp3-file.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mp3File } from './mp3-file.model';

@Injectable({
  providedIn: 'root',
})
export class Mp3FileService {
  private apiUrl = 'http://localhost:8080/api/mp3files';

  constructor(private http: HttpClient) {}

  getMp3Files(): Observable<Mp3File[]> {
    return this.http.get<Mp3File[]>(this.apiUrl);
  }

  uploadMp3File(formData: FormData): Observable<Mp3File> {
    return this.http.post<Mp3File>(`${this.apiUrl}/upload`, formData);
  }

  deleteMp3File(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
