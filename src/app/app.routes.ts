import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '', loadComponent:()=>import('./components/movie-card/movie-card').then(m=> m.MovieCard)
},
{
    path:'movieDetials/:type/:id' ,loadComponent:()=> import('./components/movie-details/movie-details').then(m=> m.MovieDetails)
},
{
    path:'watchlist' , loadComponent:()=> import('./components/watchlist/watchlist').then(m=> m.Watchlist)
},
{
    path:'searchDetails' , loadComponent:()=> import('./components/search-details/search-details').then(m=> m.SearchDetails)
},
{
    path: 'tv', loadComponent:()=> import('./components/tv-shows/tv-shows').then( m=> m.TvShows)
},
{
path:'login', loadComponent:()=> import('./components/login/login').then(m=>m.Login)
},
{
path:'register' ,loadComponent:()=> import('./components/register/register').then(m=> m.Register)
},
{
    path:"**", loadComponent:()=> import('./components/not-found/not-found').then(m=> m.NotFound)
}

];
