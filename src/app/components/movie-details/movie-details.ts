import { Component, inject, signal } from '@angular/core';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http-service/http-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails {
watchlistService= inject(WatchlistService);
httpService=inject(HttpService)
route=inject(ActivatedRoute);
router=inject(Router)

movie=signal<any>(null)
recomendedMovie=signal<any[]>([])
inWatchlist=signal<boolean>(false)


ngOnInit(){
 this.route.paramMap.subscribe((params)=>{
  const id =params.get('id');
  if(id){
    this.loadMovie(id);
    this.loadRecomendations(id)
  }
 })
}


loadMovie(id:string|number){
  this.httpService.getMovieById(id).subscribe({
    next:(data:any)=> {
      this.movie.set(data);
      this.inWatchlist.set(this.watchlistService.isInList(data.id))
    },
    error:(err:any)=> console.error('faild to fetch the movie with id', err)
  })
}

loadRecomendations(id:number|string){
  this.httpService.getRecomendedMovie(id).subscribe({
    next:(data:any)=>{
      this.recomendedMovie.set(data.results);
    },
    error:(err:any)=> console.error('faild to fetch the movie with id', err)
  })
}

toggleWatchlist(movie:any){
  this.watchlistService.toggleWatchlist(movie);
}

isInList(movieId:number){
  return this.watchlistService.isInList(movieId);
}


goToDetails(movieId:number){
this.router.navigate(['/movieDetials',movieId])
}

}
