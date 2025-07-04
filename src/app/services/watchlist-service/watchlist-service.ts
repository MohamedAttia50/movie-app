import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  watchList = signal<any[]>([]);
  watchlistCount = computed(() => this.watchList().length);
  router = inject(Router)

  toggleWatchlist(movie: any) {
    this.watchList.update((list) => {
      const exist = list.some((m) => m.id === movie.id);
      return exist ? list.filter((m) => m.id !== movie.id) : [...list, movie];
    });
  }


  isInList(movieId: number) {
    return this.watchList().some((m) => m.id === movieId)
  }

  goToDetails(movieId: number | string ,type:'movie'|'tv') {
    this.router.navigate(['/movieDetials',type ,movieId])
  }


  getRatingColor(vote: number): string {
    const percent = vote * 10;
    if (percent >= 75) return '#21d07a'; // green
    if (percent >= 50) return '#d2d531'; // yellow
    return '#db2360'; // red
  }

  clearWatchlist() {
  this.watchList.set([]); 
}

}
