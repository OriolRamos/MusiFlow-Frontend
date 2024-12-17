import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Crear simulacros para AuthService y Router
    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    // Obtener una instancia de AuthGuard
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);

    const result = authGuard.canActivate();
    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation and redirect to /pagina-iden if the user is not authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(false);

    const result = authGuard.canActivate();
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pagina-iden']);
  });
});
