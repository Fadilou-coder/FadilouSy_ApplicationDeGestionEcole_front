import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrpCmptComponent } from './edit-grp-cmpt.component';

describe('EditGrpCmptComponent', () => {
  let component: EditGrpCmptComponent;
  let fixture: ComponentFixture<EditGrpCmptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGrpCmptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrpCmptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
