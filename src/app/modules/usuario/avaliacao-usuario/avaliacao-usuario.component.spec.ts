import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoUsuarioComponent } from './avaliacao-usuario.component';

describe('AvaliacaoUsuarioComponent', () => {
  let component: AvaliacaoUsuarioComponent;
  let fixture: ComponentFixture<AvaliacaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
