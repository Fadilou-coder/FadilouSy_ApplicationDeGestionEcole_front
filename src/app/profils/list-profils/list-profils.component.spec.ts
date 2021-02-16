import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfilsComponent } from './list-profils.component';

describe('ListProfilsComponent', () => {
  let component: ListProfilsComponent;
  let fixture: ComponentFixture<ListProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
