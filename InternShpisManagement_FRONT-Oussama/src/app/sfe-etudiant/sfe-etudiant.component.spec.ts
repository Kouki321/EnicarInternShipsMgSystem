import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfeEtudiantComponent } from './sfe-etudiant.component';

describe('SfeEtudiantComponent', () => {
  let component: SfeEtudiantComponent;
  let fixture: ComponentFixture<SfeEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfeEtudiantComponent]
    });
    fixture = TestBed.createComponent(SfeEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
