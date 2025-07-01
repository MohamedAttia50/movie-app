import { Component, inject, signal } from '@angular/core';
import { HttpService } from '../../services/http-service/http-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SearchService } from '../../services/search-service/search-service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {

httpService=inject(HttpService);
searchService=inject(SearchService)
router=inject(Router)




onSubmit(){
console.log(this.searchService.result());
  
}

onSearch(){
  this.searchService.onSearch()
  this.router.navigate(['/searchDetails'])
}


}
