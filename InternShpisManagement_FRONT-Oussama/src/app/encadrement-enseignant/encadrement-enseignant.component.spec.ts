import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrementEnseignantComponent } from './encadrement-enseignant.component';

describe('EncadrementEnseignantComponent', () => {
  let component: EncadrementEnseignantComponent;
  let fixture: ComponentFixture<EncadrementEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncadrementEnseignantComponent]
    });
    fixture = TestBed.createComponent(EncadrementEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
