import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServicoComponent } from './card-servico.component';

describe('CardServicoComponent', () => {
  let component: CardServicoComponent;
  let fixture: ComponentFixture<CardServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
