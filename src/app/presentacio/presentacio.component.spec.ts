import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentacioComponent } from './presentacio.component';
import { RouterTestingModule } from '@angular/router/testing';  // Si usas rutas en tu componente


describe('PresentacioComponent', () => {
  let component: PresentacioComponent;
  let fixture: ComponentFixture<PresentacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule  // Importa los módulos necesarios, como RouterTestingModule si usas rutas
      ],
      declarations: [PresentacioComponent]  // Declara el componente
    })
    .compileComponents();  // Compila los componentes

    fixture = TestBed.createComponent(PresentacioComponent);  // Crea el componente
    component = fixture.componentInstance;  // Instancia el componente
    fixture.detectChanges();  // Detecta los cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se haya creado
  });
});
