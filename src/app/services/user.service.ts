import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Mp3File} from '../mp3-file/mp3-file.model';

export interface User {
  id: number;
  userName: string;
  password: string;
  songs: Mp3File[];
}
  @Injectable({
    providedIn: 'root'
  })

  export class UserService {

  private baseUrl = 'http://localhost:8080/api/user';

  private currentUserSubject: BehaviorSubject<User | null>;
  currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = typeof window !== 'undefined' && localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  setUser(user: User): void {
    this.currentUserSubject.next(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  findUser(userName: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    return this.http.get<User>(`${this.baseUrl}/findUser`, { params });
  }

  createUser(userName: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    return this.http.post<User>(`${this.baseUrl}/createUser`, null, { params });
  }


}
