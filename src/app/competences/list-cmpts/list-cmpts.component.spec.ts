import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCmptsComponent } from './list-cmpts.component';

describe('ListCmptsComponent', () => {
  let component: ListCmptsComponent;
  let fixture: ComponentFixture<ListCmptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCmptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCmptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
