import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSelectorListComponent } from './membership-selector-list.component';

describe('OrgSelectorListComponent', () => {
  let component: MembershipSelectorListComponent;
  let fixture: ComponentFixture<MembershipSelectorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSelectorListComponent],
    });
    fixture = TestBed.createComponent(MembershipSelectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
