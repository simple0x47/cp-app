import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategorySetSelectorComponent} from './category-set-selector.component';

describe('CategorySetSelectorComponent', () => {
  let component: CategorySetSelectorComponent;
  let fixture: ComponentFixture<CategorySetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySetSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategorySetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
