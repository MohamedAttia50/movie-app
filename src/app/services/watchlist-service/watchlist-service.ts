import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private initialWatchlist= this.getWatchlistFromStorage();
  watchList = signal<any[]>(this.initialWatchlist);
  watchlistCount = computed(() => this.watchList().length);
  router = inject(Router)

  toggleWatchlist(movie: any) {
    this.watchList.update((list) => {
      const exist = list.some((m) => m.id === movie.id);
      return exist ? list.filter((m) => m.id !== movie.id) : [...list, movie];
    });
  }

  watchlistEffect =effect(()=>{
    sessionStorage.setItem('watchlist_key',JSON.stringify(this.watchList()))
  })
  isInList(movieId: number) {
    return this.watchList().some((m) => m.id === movieId)
  }

  goToDetails(movieId: number | string ,type:'movie'|'tv') {
    this.router.navigate(['/movieDetials',type ,movieId])
  }

getConicGradient(vote: number): string {
  const percent = Math.round(vote * 10);
  const color = this.getRatingColor(vote);
  return `conic-gradient(${color} ${percent}%, #204529 ${percent}%)`;
}

  getRatingColor(vote: number): string {
    const percent = vote * 10;
    if (percent >= 75) return '#21d07a'; // green
    if (percent >= 50) return '#d2d531'; // yellow
    return '#db2360'; // red
  }

  clearWatchlist() {
  this.watchList.set([]); 
  sessionStorage.removeItem('watchlist_key');
}

private getWatchlistFromStorage():any[]{
  const data =sessionStorage.getItem('watchlist_key');
  return data ?JSON.parse(data):[];
}

}
