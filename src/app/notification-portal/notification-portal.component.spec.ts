import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPortalComponent } from './notification-portal.component';

describe('NotificationPortalComponent', () => {
  let component: NotificationPortalComponent;
  let fixture: ComponentFixture<NotificationPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
