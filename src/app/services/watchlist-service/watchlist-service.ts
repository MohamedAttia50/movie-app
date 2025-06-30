import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  watchList=signal<any[]>([]);
  watchlistCount=computed(()=>this.watchList().length);

  toggleWatchlist(movie:any){
    this.watchList.update((list)=>{
      const exist= list.some((m)=>m.id===movie.id);
      return exist? list.filter((m)=>m.id!==movie.id):[...list,movie]
    })
  }


  isInList(movieId:number){
    return this.watchList().some((m)=>m.id===movieId)
  }


}
