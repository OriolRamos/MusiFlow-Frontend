import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mp3FileComponent } from './mp3-file.component';

describe('Mp3FileComponent', () => {
  let component: Mp3FileComponent;
  let fixture: ComponentFixture<Mp3FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mp3FileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mp3FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
