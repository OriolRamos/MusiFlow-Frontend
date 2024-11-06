import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Mp3FileComponent} from './mp3-file/mp3-file.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, Mp3FileComponent] // Afegeix els mòduls aquí
})
export class AppComponent {
  uploadForm: FormGroup;
  uploadedFiles: string[] = [];
  title = 'MusiFlow-Frontend';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      file: [null]
    });
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
}
