import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VadidateProductsComponent } from './vadidate-products.component';

describe('VadidateProductsComponent', () => {
  let component: VadidateProductsComponent;
  let fixture: ComponentFixture<VadidateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VadidateProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VadidateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
