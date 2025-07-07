import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  imports: [RouterLink,CommonModule],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss'
})
export class Watchlist {

watchlistService=inject(WatchlistService);
router=inject(Router)

get movies(){

return this.watchlistService.watchList();


}

removeFromList(movie:any){
  this.watchlistService.toggleWatchlist(movie)
}

getRatingColor(vote: number){
  return this.watchlistService.getRatingColor(vote);
}

}