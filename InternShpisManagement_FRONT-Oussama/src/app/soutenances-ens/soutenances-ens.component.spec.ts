import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenancesEnsComponent } from './soutenances-ens.component';

describe('SoutenancesEnsComponent', () => {
  let component: SoutenancesEnsComponent;
  let fixture: ComponentFixture<SoutenancesEnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoutenancesEnsComponent]
    });
    fixture = TestBed.createComponent(SoutenancesEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
