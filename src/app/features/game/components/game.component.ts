import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { GameService } from '../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted = true;
  loading = false;
  games: Game[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: null,
      description: null,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.service.searchGames(this.form?.value)
      .pipe(tap(() => {
          this.loading = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (result: Game[]) => {
          this.games = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al buscar los juegos', 'Error en búsqueda');
          this.loading = false;
        },
      });
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      name: null,
      description: null,
    });
  }

  private getGames(): void {
    this.loading = true;

    this.service.getGames()
      .pipe(tap(() => {
          this.loading = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (result: Game[]) => {
          this.games = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar los juegos', 'Juegos');
          this.loading = false;
        },
      });
  }

  ngOnInit(): void {
    this.getGames();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
