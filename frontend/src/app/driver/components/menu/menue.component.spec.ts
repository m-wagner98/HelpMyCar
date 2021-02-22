import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenueComponent} from './menue.component';
import {MatMenuModule} from '@angular/material/menu';

describe('MenueComponent', () => {
  let component: MenueComponent;
  let fixture: ComponentFixture<MenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenueComponent],
      imports: [MatMenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
