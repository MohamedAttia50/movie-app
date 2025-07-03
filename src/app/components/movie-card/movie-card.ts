import { Component, effect, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Search } from '../search/search';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, Search],
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
  movies = signal<any[]>([]);
  router = inject(Router)



  ngOnInit() {
    this.httpService.getMoviesData().subscribe({
      next: (data: any) => {
        this.movies.set(data.results);
      },
      error: (err: any) => console.error('faild to fetch the data', err)
    })
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
