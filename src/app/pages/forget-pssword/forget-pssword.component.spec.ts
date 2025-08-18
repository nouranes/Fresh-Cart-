import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPsswordComponent } from './forget-pssword.component';

describe('ForgetPsswordComponent', () => {
  let component: ForgetPsswordComponent;
  let fixture: ComponentFixture<ForgetPsswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPsswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
