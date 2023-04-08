import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCatSubComponent } from './add-edit-cat-sub.component';

describe('AddEditCatSubComponent', () => {
  let component: AddEditCatSubComponent;
  let fixture: ComponentFixture<AddEditCatSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCatSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCatSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
