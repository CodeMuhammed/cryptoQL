import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioStartComponent } from './portfolio-start.component';

describe('PortfolioStartComponent', () => {
  let component: PortfolioStartComponent;
  let fixture: ComponentFixture<PortfolioStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
