import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIconComponent } from './recipe-icon.component';

describe('RecipeIconComponent', () => {
  let component: RecipeIconComponent;
  let fixture: ComponentFixture<RecipeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
