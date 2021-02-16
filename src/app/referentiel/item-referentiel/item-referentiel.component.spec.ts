import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReferentielComponent } from './item-referentiel.component';

describe('ItemReferentielComponent', () => {
  let component: ItemReferentielComponent;
  let fixture: ComponentFixture<ItemReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
