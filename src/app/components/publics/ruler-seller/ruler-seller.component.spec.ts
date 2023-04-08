import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulerSellerComponent } from './ruler-seller.component';

describe('RulerSellerComponent', () => {
  let component: RulerSellerComponent;
  let fixture: ComponentFixture<RulerSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulerSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulerSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
