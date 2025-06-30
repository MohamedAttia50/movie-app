import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '', loadComponent:()=>import('./components/movie-card/movie-card').then(m=> m.MovieCard)
},
{
    path:'movieDetials/:id' ,loadComponent:()=> import('./components/movie-details/movie-details').then(m=> m.MovieDetails)
},
{
    path:'watchlist' , loadComponent:()=> import('./components/watchlist/watchlist').then(m=> m.Watchlist)
}

];
