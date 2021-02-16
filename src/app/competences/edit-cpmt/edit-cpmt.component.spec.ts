import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCpmtComponent } from './edit-cpmt.component';

describe('EditCpmtComponent', () => {
  let component: EditCpmtComponent;
  let fixture: ComponentFixture<EditCpmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCpmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCpmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
