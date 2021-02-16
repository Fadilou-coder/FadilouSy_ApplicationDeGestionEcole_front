import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProfilComponent } from './item-profil.component';

describe('ItemProfilComponent', () => {
  let component: ItemProfilComponent;
  let fixture: ComponentFixture<ItemProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
