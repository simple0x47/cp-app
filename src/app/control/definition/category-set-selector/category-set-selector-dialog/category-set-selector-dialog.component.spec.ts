import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategorySetSelectorDialogComponent} from './category-set-selector-dialog.component';

describe('CategorySetSelectorDialogComponent', () => {
  let component: CategorySetSelectorDialogComponent;
  let fixture: ComponentFixture<CategorySetSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySetSelectorDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategorySetSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
