import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelectorDialogComponent } from './org-selector-dialog.component';

describe('OrgSelectorDialogComponent', () => {
  let component: OrgSelectorDialogComponent;
  let fixture: ComponentFixture<OrgSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSelectorDialogComponent]
    });
    fixture = TestBed.createComponent(OrgSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
