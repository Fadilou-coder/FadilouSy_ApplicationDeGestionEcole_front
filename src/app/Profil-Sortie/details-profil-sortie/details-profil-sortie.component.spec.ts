import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProfilSortieComponent } from './details-profil-sortie.component';

describe('DetailsProfilSortieComponent', () => {
  let component: DetailsProfilSortieComponent;
  let fixture: ComponentFixture<DetailsProfilSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProfilSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProfilSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
