import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCmptsComponent } from './details-cmpts.component';

describe('DetailsCmptsComponent', () => {
  let component: DetailsCmptsComponent;
  let fixture: ComponentFixture<DetailsCmptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCmptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCmptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
