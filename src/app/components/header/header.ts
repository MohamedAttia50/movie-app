import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  watchlistService=inject(WatchlistService);


}
