import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaIdemComponent } from './pagina-idem.component';
import { RouterTestingModule } from '@angular/router/testing';  // Si usas rutas en tu componente


describe('PaginaIdemComponent', () => {
  let component: PaginaIdemComponent;
  let fixture: ComponentFixture<PaginaIdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule  // Importa los módulos necesarios, como RouterTestingModule si usas rutas
      ],
      declarations: [PaginaIdemComponent]  // Declara el componente
    })
    .compileComponents();  // Compila los componentes

    fixture = TestBed.createComponent(PaginaIdemComponent);  // Crea el componente
    component = fixture.componentInstance;  // Instancia el componente
    fixture.detectChanges();  // Detecta los cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado
  });
});
