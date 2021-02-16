import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGrpCmptsComponent } from './list-grp-cmpts.component';

describe('ListGrpCmptsComponent', () => {
  let component: ListGrpCmptsComponent;
  let fixture: ComponentFixture<ListGrpCmptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGrpCmptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGrpCmptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
