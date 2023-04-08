import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSizColComponent } from './add-edit-siz-col.component';

describe('AddEditSizColComponent', () => {
  let component: AddEditSizColComponent;
  let fixture: ComponentFixture<AddEditSizColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSizColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSizColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
