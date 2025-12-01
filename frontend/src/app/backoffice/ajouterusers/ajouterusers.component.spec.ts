import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterusersComponent } from './ajouterusers.component';

describe('AjouterusersComponent', () => {
  let component: AjouterusersComponent;
  let fixture: ComponentFixture<AjouterusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
