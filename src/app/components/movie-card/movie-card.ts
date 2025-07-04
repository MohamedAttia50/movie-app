import { Component, effect, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Search } from '../search/search';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, Search, NgbPaginationModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {

  constructor() {
    effect(() => {
      console.log(this.movies());
    })

  };
  httpService = inject(HttpService);
  watchlistService = inject(WatchlistService);
  authService=inject(AuthService);
  movies = signal<any[]>([]);
  router = inject(Router);

  currentPage=signal(1);
  totalResults = signal(0);
  hoveredMovieId = signal<number | null>(null);
  isLoggedIn = this.authService.isLoggedIn;


  onWatchlistClick(movie:any){
     if (!this.isLoggedIn()) return;
  this.toggleWatchlist(movie);
  }

  ngOnInit() {
    this.fetchMovies(this.currentPage());
  }

  fetchMovies(page:number){
    this.httpService.getNowPlayingMovies(page).subscribe({
      next:(data:any)=>{
        this.movies.set(data.results);
        this.totalResults.set(data.total_results);
        console.log(data);
        
      },
      error:(err:any) => console.error('Error fetching movies', err)

    })
  }

  onPageChange(page:number){
    this.currentPage.set(page);
    this.fetchMovies(page);
  }

  toggleWatchlist(movie: any) {
    this.watchlistService.toggleWatchlist(movie);
  }

  isInList(movieId: number) {
    return this.watchlistService.isInList(movieId);
  }


  goToDetails(movieId: number | string , type:'tv'|'movie') {
    this.router.navigate(['/movieDetials', type,movieId])
  }
  
  getRatingColor(vote: number): string {
  return this.watchlistService.getRatingColor(vote);
}



}
