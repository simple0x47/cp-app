import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EntitySelectorDialogComponent} from './entity-selector-dialog.component';

describe('EntitySelectorDialogComponent', () => {
  let component: EntitySelectorDialogComponent;
  let fixture: ComponentFixture<EntitySelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySelectorDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntitySelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
