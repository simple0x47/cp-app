import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSelectorComponent } from './membership-selector.component';

describe('OrgSelectorComponent', () => {
  let component: MembershipSelectorComponent;
  let fixture: ComponentFixture<MembershipSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSelectorComponent],
    });
    fixture = TestBed.createComponent(MembershipSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
