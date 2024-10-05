import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrementEtudiantComponent } from './encadrement-etudiant.component';

describe('EncadrementEtudiantComponent', () => {
  let component: EncadrementEtudiantComponent;
  let fixture: ComponentFixture<EncadrementEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncadrementEtudiantComponent]
    });
    fixture = TestBed.createComponent(EncadrementEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
