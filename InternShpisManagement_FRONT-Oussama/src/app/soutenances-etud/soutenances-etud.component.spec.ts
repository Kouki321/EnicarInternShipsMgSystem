import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenancesEtudComponent } from './soutenances-etud.component';

describe('SoutenancesEtudComponent', () => {
  let component: SoutenancesEtudComponent;
  let fixture: ComponentFixture<SoutenancesEtudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoutenancesEtudComponent]
    });
    fixture = TestBed.createComponent(SoutenancesEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
