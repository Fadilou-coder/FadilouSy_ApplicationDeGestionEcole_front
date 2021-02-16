import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCmptComponent } from './add-cmpt.component';

describe('AddCmptComponent', () => {
  let component: AddCmptComponent;
  let fixture: ComponentFixture<AddCmptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCmptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCmptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
