import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignUpComponent } from './modal-sign-up.component';

describe('ModalSignUpComponent', () => {
  let component: ModalSignUpComponent;
  let fixture: ComponentFixture<ModalSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
