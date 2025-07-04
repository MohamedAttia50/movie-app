import { Component, inject, signal, ViewChild, TemplateRef } from '@angular/core';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http-service/http-service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth-service/auth-service';
@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {
  watchlistService = inject(WatchlistService);
  httpService = inject(HttpService);
  authService=inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  movie = signal<any>(null);
  recomendedMovie = signal<any[]>([]);
  inWatchlist = signal<boolean>(false);

  hoveredHeart=signal<boolean>(false);
  isLoggedIn=this.authService.isLoggedIn;

  modalService = inject(NgbModal);
  sanitizer = inject(DomSanitizer);
  trailerKey = signal<string | null>(null);
  safeTrailerUrl = signal<SafeResourceUrl | null>(null);

  @ViewChild('trailerModal') trailerModalRef!: TemplateRef<any>;


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const type = params.get('type') as 'movie' | 'tv';
      if (id && type) {
        this.loadDetails(id, type);
        this.loadRecomendations(id, type);
        this.loadTrailer(id, type)
      }
    })
  }


  loadDetails(id: string | number, type: 'tv' | 'movie') {
    const apiCall = type === 'movie'
      ? this.httpService.getMovieById(id)
      : this.httpService.getTvShowById(id)

    apiCall.subscribe({
      next: (data: any) => {
        this.movie.set(data)
        this.inWatchlist.set(this.watchlistService.isInList(data.id))
      },
      error: (err: any) => console.error(`faild to fetch the ${type} details with id`, err)
    })


  }

  loadRecomendations(id: number | string, type: 'tv' | 'movie') {
    const apiCall = type === 'movie'
      ? this.httpService.getRecomendedMovie(id)
      : this.httpService.getRecomendedTvShow(id)

    apiCall.subscribe({
      next: (data: any) => {
        this.recomendedMovie.set(data.results)
      },
      error: (err: any) => console.error(`faild to fetch the ${type} Recomendations with id`, err)
    })


  }

  onWatchlistClick(movie: any) {
    if (!this.isLoggedIn()) return;
    this.toggleWatchlist(movie);
  }
  toggleWatchlist(movie: any) {
    this.watchlistService.toggleWatchlist(movie);
    
  }

  isInList(movieId: number) {
    return this.watchlistService.isInList(movieId);
  }


  goToDetails(movieId: number, type: 'movie' | 'tv') {
    this.watchlistService.goToDetails(movieId, type);
  }


  getRatingColor(vote: number): string {
    return this.watchlistService.getRatingColor(vote)
  }

  loadTrailer(id: number | string, type: 'movie' | 'tv') {
    this.httpService.getVideos(id, type).subscribe({
      next: (res: any) => {
        const trailer = res.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer?.key) {
          this.trailerKey.set(trailer.key);
          this.safeTrailerUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${trailer.key}`));
        }
      },
      error: (err) => console.error('Error fetching trailer', err),
    });
  }

  openTrailerModal() {
    this.modalService.open(this.trailerModalRef, { size: 'lg', centered: true });
  }
}