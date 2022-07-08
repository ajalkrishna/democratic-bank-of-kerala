import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHoldersComponent } from './account-holders.component';

describe('AccountHoldersComponent', () => {
  let component: AccountHoldersComponent;
  let fixture: ComponentFixture<AccountHoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
