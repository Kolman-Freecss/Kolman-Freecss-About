import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { GameService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { faAnglesDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { HighlightGame, Options } from '../../../shared/models';
import { GamePage } from '../models/game';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { assetUrl } from '../../../../single-spa/asset-url';

const fadeInOut = trigger('fadeInOut', [
  state ('shown', style({ opacity: 1 })),
  state ('hidden', style({ opacity: 0 })),
  transition('shown => hidden', [animate('0.5s ease-out')]),
  transition('hidden => shown', [animate('0.5s ease-in')]),
]);

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [fadeInOut],
})
export class GameComponent implements OnInit, OnDestroy {

  gamePage: GamePage = {
    content: [],
    filteredSize: 0,
    filteredPages: 0,
    totalElements: 0,
  };
  listPossibleTechs: string[] = [];
  arrow = faAnglesDown;

  destroy$: Subject<boolean> = new Subject<boolean>();

  clickSoundUrl = assetUrl('audio/click_003.ogg');

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

  @ViewChild('hoverSound') hoverSoundRef: ElementRef<HTMLAudioElement> | undefined;

  initPulledGames: Subscription | undefined;

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

  /**
   * Clean url if it searchs inside the assets folder
   * @param url
   */
  sanitizeImageUrl(url: string): string {
    if (url.includes('assets/')) {
      return assetUrl(url.replace('assets/', ''));
    }
    return url
  }

  initGetGames(): void {
    this.loading = true;

    this.initPulledGames = this.service.gamesPulled.subscribe(() => {
      this.service.getGamesPaginated(this.options)
      .pipe(tap(() => {
          this.loading = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (result: GamePage) => {
          this.gamePage = result;
          this.listPossibleTechs = this.possibleTechs();
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error al cargar los juegos', 'Juegos');
          this.loading = false;
        },
      });
    });

    this.service.refreshGames();
  }

  playVideo(id: string, videoP: string): void {
    if (!videoP || videoP.length === 0) {
      return;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video) {
      video.play().then(r => r).catch(e => e);
    }
  }

  pauseVideo(id: string, videoP: string): void {
    if (!videoP || videoP.length === 0) {
      return;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video) {
      video.pause();
    }
  }

  isVideoPlaying(id: string, videoP: string): boolean {
    if (!videoP || videoP.length === 0) {
      return false;
    }
    const video = document.getElementById(id) as HTMLVideoElement;
    if (!video) {
      return false;
    }
    return video ? !video.paused : false;
  }

  /**
   * #region  Form
   */

  createForm() {
    this.form = this.fb.group({
      name: null,
      description: null,
      techs: null,
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
      techs: null,
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

  possibleTechs(): string[] {
    if (this.listPossibleTechs.length > 0) {
      return this.listPossibleTechs;
    }
    const techs: string[] = [];
    this.gamePage?.content?.forEach((game) => {
      game.techs?.forEach((tech) => {
        if (!techs.includes(tech)) {
          techs.push(tech);
        }
      });
    });
    return techs;
  }

  /**
   * #endregion
   */

  /**
   * #region  Angular lifecycle
   */

  ngOnInit(): void {
    this.initGetGames();
    this.getHighlightGames().subscribe((data) => {
      this.highlightGames = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.initPulledGames) {
      this.initPulledGames.unsubscribe();
    }
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
      audio.play().then(r => r).catch(e => e);
    }
  }

  /**
   * #endregion
   */

}
