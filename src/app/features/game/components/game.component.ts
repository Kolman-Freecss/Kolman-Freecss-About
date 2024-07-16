import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Game } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { GameService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { faAnglesDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { HighlightGame, Options } from '../../../shared/models';
import { GamePage } from '../models/game';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('fadeImg', [
      state('fadeInImg', style({ opacity: 1 })),
      state('fadeOutImg', style({ opacity: 0 })),
      transition('fadeInImg => fadeOutImg', animate('500ms ease-out')),
      transition('fadeOutImg => fadeInImg', animate('500ms ease-in'))
    ]),
    trigger('fadeVideo', [
      state('fadeInImg', style({ opacity: 1 })),
      state('fadeOutImg', style({ opacity: 0 })),
      transition('fadeInImg => fadeOutImg', animate('500ms ease-out')),
      transition('fadeOutImg => fadeInImg', animate('500ms ease-in'))
    ])
  ]
})
export class GameComponent implements OnInit, OnDestroy {

  games: Game[] = [];
  gamePage: GamePage = {
    content: [],
    filteredSize: 0,
    filteredPages: 0,
    totalElements: 0,
  };
  arrow = faAnglesDown;

  destroy$: Subject<boolean> = new Subject<boolean>();

  // Pagination
  options: Options = {
    page: 0,
    pageSize: 9,
  }

  // Form controls
  form!: FormGroup;
  submitted = true;
  loading = false;
  showFilter = true;
  filterIcon = faFilter;

  highlightGames : HighlightGame[] = [];

  @HostBinding('@fadeImg') fadeImg = 'fadeInImg';
  @HostBinding('@fadeVideo') fadeVideo = 'fadeOutImg';
  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  imagesBackground: string[] = [
      'assets/img/general-background-7.jpg',
      'assets/img/general-background-6.jpg',
      'assets/img/general-background-5.jpg',
      ];

  constructor(
    private fb: FormBuilder,
    private service: GameService,
    private toastr: ToastrService,
    private firestore: Firestore
  ) {
    this.createForm();
  }

  getHighlightGames(): Observable<HighlightGame[]> {
    const highlightRef = collection(this.firestore, 'highlightGames');
    return collectionData(highlightRef, {idField: 'id'}) as Observable<HighlightGame[]>;
  }

  searchGamesPaginated(): void {
    this.service.searchGamesPaginated(this.form?.value, this.options)
      .pipe(tap(() => {
          this.loading = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (result: GamePage) => {
          this.gamePage = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al buscar los juegos', 'Error en búsqueda');
          this.loading = false;
        },
      });
  }

  getGames(): void {
    this.loading = true;

    this.service.getGamesPaginated(this.options)
      .pipe(tap(() => {
          this.loading = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (result: GamePage) => {
          this.gamePage = result;
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar los juegos', 'Juegos');
          this.loading = false;
        },
      });
  }

  playVideo(id: string, videoP: string): void {
    if (!videoP || videoP.length === 0) {
      return;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video) {
      this.fadeImg = 'fadeOutImg';
      this.fadeVideo = 'fadeInImg';
      video.play();
    }
  }

  pauseVideo(id: string, videoP: string): void {
    if (!videoP || videoP.length === 0) {
      return;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video) {
      this.fadeImg = 'fadeInImg';
      this.fadeVideo = 'fadeOutImg';
      video.pause();
    }
  }

  isVideoPlaying(id: string, videoP: string): boolean {
    if (!videoP || videoP.length === 0) {
      return false;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    return video ? !video.paused : false;
  }

  /**
   * #region  Form
   */

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
    this.searchGamesPaginated();
  }

  onReset() {
    this.submitted = false;

    this.form.reset({
      name: null,
      description: null,
    });

    this.gamePage = {
      content: [],
      filteredSize: 0,
      filteredPages: 0,
      totalElements: 0,
    }
  }

  showFilters() {
    this.showFilter = !this.showFilter;
  }

  /**
   * #endregion
   */

  /**
   * #region  Angular lifecycle
   */

  ngOnInit(): void {
    this.getGames();
    this.getHighlightGames().subscribe((data) => {
      this.highlightGames = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * #endregion
   */

  /**
   * #region  Paginator
   */

  arrayFromMaxNumber(max: number): number[] {
    return Array.from({length: max}, (v, k) => k);
  }

  next() {
    this.options.page++;
    this.searchGamesPaginated();
  }

  to(page: number) {
    this.options.page = page;
    this.searchGamesPaginated();
  }

  prev() {
    this.options.page--;
    this.searchGamesPaginated();
  }

  playHoverSound(): void {
    if (this.hoverSoundRef) {
      const audio = this.hoverSoundRef.nativeElement;
      audio.currentTime = 0;
      audio.play();
    }
  }

  /**
   * #endregion
   */

}
