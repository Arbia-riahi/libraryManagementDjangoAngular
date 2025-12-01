import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierusersComponent } from './modifierusers.component';

describe('ModifierusersComponent', () => {
  let component: ModifierusersComponent;
  let fixture: ComponentFixture<ModifierusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifierusersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
