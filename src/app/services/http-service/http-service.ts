import { inject, Injectable, signal } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LangService } from '../lang-service/lang-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpClint = inject(HttpClient);
  private headers = new HttpHeaders({
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM'
  });

  private withLang(extraParams: any={}){
    return{
      headers:this.headers,
      params: {
        ...this.langService.languageParam,
        ...extraParams
      }
    }
  }

  langService=inject(LangService);


  getMoviesData() {
  return this.httpClint.get("https://api.themoviedb.org/3/movie/now_playing",this.withLang())
  }

  getMovieById(movieId: string | number){
  return  this.httpClint.get(`https://api.themoviedb.org/3/movie/${movieId}`,this.withLang())
  }


  getRecomendedMovie(movieId: string | number){
    return this.httpClint.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`,this.withLang())
  }


  searchMovie(query:string){
    return this.httpClint.get(`https://api.themoviedb.org/3/search/movie?&query=${query}`,this.withLang())

}

  getTvShows(){
    return this.httpClint.get(`https://api.themoviedb.org/3/tv/popular`,this.withLang())
  }

  getTvShowById(tvId: string | number){
  return  this.httpClint.get(`https://api.themoviedb.org/3/tv/${tvId}`,this.withLang())
  }

  getRecomendedTvShow(tvId: string | number){
    return this.httpClint.get(`https://api.themoviedb.org/3/tv/${tvId}/recommendations`,this.withLang())
  }

  getVideos(id:number |string , type:'tv'|'movie'){
    return this.httpClint.get(`https://api.themoviedb.org/3/${type}/${id}/videos`,this.withLang())
  }
}
