import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategorySelectComponent} from './category-select.component';

describe('ProductCategoryComponent', () => {
  let component: CategorySelectComponent;
  let fixture: ComponentFixture<CategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
