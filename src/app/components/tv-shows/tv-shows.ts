import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { Search } from '../search/search';
import { AuthService } from '../../services/auth-service/auth-service';
@Component({
  selector: 'app-tv-shows',
  imports: [CommonModule ,Search] ,
  templateUrl: './tv-shows.html',
  styleUrl: './tv-shows.scss'
})
export class TvShows {
httpService=inject(HttpService);
authService=inject(AuthService);
tvShows=signal<any[]>([]);
watchlistService=inject(WatchlistService);
isLoggedIn = this.authService.isLoggedIn;
hoveredShowId = signal<number | null>(null);


onWatchlistClick(show: any) {
  if (!this.isLoggedIn()) return;
  this.toggleWatchlist(show);
}

ngOnInit(){
  this.httpService.getTvShows().subscribe({
    next:(data:any)=>{
      this.tvShows.set(data.results);
      
    },
    error:(err:any)=> console.error('failed to fetch tv series',err)
  })
}

toggleWatchlist(movie:any){
  if (!this.isLoggedIn()) return;
 this.watchlistService.toggleWatchlist(movie);
}

isInList(movieId:number){
  return this.watchlistService.isInList(movieId);
}

goToDetails(movieId:number,type:'movie'|'tv'){
  this.watchlistService.goToDetails(movieId,type)
}
}
