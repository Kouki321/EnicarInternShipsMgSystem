import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfeEnseignantComponent } from './sfe-enseignant.component';

describe('SfeEnseignantComponent', () => {
  let component: SfeEnseignantComponent;
  let fixture: ComponentFixture<SfeEnseignantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfeEnseignantComponent]
    });
    fixture = TestBed.createComponent(SfeEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
