import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCompositionComponent} from './product-composition.component';

describe('ProductCompositionComponent', () => {
  let component: ProductCompositionComponent;
  let fixture: ComponentFixture<ProductCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCompositionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
