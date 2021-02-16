import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrpCmptComponent } from './add-grp-cmpt.component';

describe('AddGrpCmptComponent', () => {
  let component: AddGrpCmptComponent;
  let fixture: ComponentFixture<AddGrpCmptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrpCmptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrpCmptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
