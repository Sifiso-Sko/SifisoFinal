import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassowrdPageComponent } from './forgot-passowrd-page.component';

describe('ForgotPassowrdPageComponent', () => {
  let component: ForgotPassowrdPageComponent;
  let fixture: ComponentFixture<ForgotPassowrdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassowrdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassowrdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
