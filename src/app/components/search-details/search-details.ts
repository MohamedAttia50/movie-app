import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service/search-service';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';

@Component({
  selector: 'app-search-details',
  imports: [FormsModule,CommonModule],
  templateUrl: './search-details.html',
  styleUrl: './search-details.scss'
})
export class SearchDetails {
watchlistService=inject(WatchlistService);
searchService=inject(SearchService);

get searchResult(){
  return this.searchService.result()
}

goToDetails(movieId:number|string){
  this.watchlistService.goToDetails(movieId)
}

toggleWatchlist(movie:any){
  this.watchlistService.toggleWatchlist(movie)
}

isInList(movieId:number){
  return this.watchlistService.isInList(movieId)
}
}
