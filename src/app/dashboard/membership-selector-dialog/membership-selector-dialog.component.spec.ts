import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSelectorDialogComponent } from './membership-selector-dialog.component';

describe('OrgSelectorDialogComponent', () => {
  let component: MembershipSelectorDialogComponent;
  let fixture: ComponentFixture<MembershipSelectorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSelectorDialogComponent],
    });
    fixture = TestBed.createComponent(MembershipSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
