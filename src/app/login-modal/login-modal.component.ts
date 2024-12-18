  import { Component, Output, EventEmitter } from '@angular/core';
  import {CommonModule, NgIf} from '@angular/common';
  import { Router } from '@angular/router';
  import { UserService, User } from '../services/user.service';
  import {FormsModule} from '@angular/forms';
  import { Observable } from 'rxjs';
  @Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css'],
    standalone: true,
    imports: [FormsModule, NgIf]
  })
  export class LoginModalComponent {
    @Output() closeModal = new EventEmitter<void>();

    idem: Boolean = false;
    userName: string = '';
    password: string = '';
    errorMessage: string = '';
    user: User | null = null;

    constructor(private router: Router, private userService: UserService) {}

    close() {
      this.closeModal.emit();
      this.router.navigate(['..']);
    }


    iniciarSessio() {
      this.userService.findUser(this.userName, this.password).subscribe(

        (user: User) => {
          this.user = user;
          console.log('Usuari trobat:', this.user.userName);

          this.userService.setUser(user);

          this.closeModal.emit();
          this.errorMessage = ' tot ok';
          this.idem = true;
          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessage = "error d'usuari o contrasenya";
        }
      );
    }

    registrarse(){
      if (this.userName.trim() && this.password.trim()) {
        this.userService.createUser(this.userName, this.password).subscribe(
          (user) => {
            console.log('Usuari creat:', user);
            this.userService.setUser(user);
            this.errorMessage = '';
            setTimeout(() => this.router.navigate(['..']), 2000); // Navegar després de registrar-se
            this.idem = true;
          },
          (error) => {
            this.errorMessage =
              "No s'ha pogut completar el registre. Si us plau, prova-ho més tard.";
           // this.successMessage = '';
          }
        );
      } else {
        this.errorMessage = 'Els camps no poden estar buits.';
      }
    }

    pasarSeguentpagina(){
      
    }
  }
