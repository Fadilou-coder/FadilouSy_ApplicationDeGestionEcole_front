import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfilSortieComponent } from './list-profil-sortie.component';

describe('ListProfilSortieComponent', () => {
  let component: ListProfilSortieComponent;
  let fixture: ComponentFixture<ListProfilSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProfilSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfilSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
