import { inject, Injectable,signal } from '@angular/core';
import { HttpService } from '../http-service/http-service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

httpService=inject(HttpService)
userQuery=signal<string>('');
result=signal<any[]>([]);
loading=signal<boolean>(false)


onSearch(){
  const q =this.userQuery().trim();
  if(!q){
    return
  }
  this.loading.set(true);
  this.httpService.searchMovie(q).subscribe({
    next:(data:any)=>{
      this.result.set(data.results);
      this.loading.set(false)
      console.log(this.result());
      
    } ,
    error:(err:any)=>{
      console.error('',err);
      this.loading.set(false);
    } 
  })
}


}
