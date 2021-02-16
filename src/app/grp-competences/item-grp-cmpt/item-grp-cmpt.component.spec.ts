import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGrpCmptComponent } from './item-grp-cmpt.component';

describe('ItemGrpCmptComponent', () => {
  let component: ItemGrpCmptComponent;
  let fixture: ComponentFixture<ItemGrpCmptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGrpCmptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGrpCmptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
