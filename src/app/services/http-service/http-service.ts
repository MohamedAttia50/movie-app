import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpClint = inject(HttpClient)
  private headers = new HttpHeaders({
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM'
  });


  getMoviesData() {
  return this.httpClint.get("https://api.themoviedb.org/3/movie/now_playing",{
    headers:this.headers
  }
    
  )
  }

  getMovieById(movieId: string | number){
  return  this.httpClint.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
      headers:this.headers
    })
  }

  getRecomendedMovie(movieId: string | number){
    return this.httpClint.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`,{
      headers:this.headers
    })
  }
  

}
