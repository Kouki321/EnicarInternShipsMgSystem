import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfesComponent } from './sfes.component';

describe('SfesComponent', () => {
  let component: SfesComponent;
  let fixture: ComponentFixture<SfesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfesComponent]
    });
    fixture = TestBed.createComponent(SfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
