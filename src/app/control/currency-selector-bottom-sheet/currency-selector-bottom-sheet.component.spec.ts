import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrencySelectorBottomSheetComponent} from './currency-selector-bottom-sheet.component';

describe('CurrencySelectorBottomSheetComponent', () => {
  let component: CurrencySelectorBottomSheetComponent;
  let fixture: ComponentFixture<CurrencySelectorBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencySelectorBottomSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencySelectorBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
