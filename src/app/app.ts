import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { MovieCard } from "./components/movie-card/movie-card";
import { Search } from "./components/search/search";
import { MovieDetails } from "./components/movie-details/movie-details";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MovieCard, Search, MovieDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'movie-app';
}
