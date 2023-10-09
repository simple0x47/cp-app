import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCompositionDialogComponent} from './product-composition-dialog.component';

describe('ProductCompositionDialogComponent', () => {
  let component: ProductCompositionDialogComponent;
  let fixture: ComponentFixture<ProductCompositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCompositionDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCompositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
