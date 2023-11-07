import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelectorListComponent } from './org-selector-list.component';

describe('OrgSelectorListComponent', () => {
  let component: OrgSelectorListComponent;
  let fixture: ComponentFixture<OrgSelectorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSelectorListComponent]
    });
    fixture = TestBed.createComponent(OrgSelectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
