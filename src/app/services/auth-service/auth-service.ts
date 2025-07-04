import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { WatchlistService } from '../watchlist-service/watchlist-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  watchlistService=inject(WatchlistService)

  private userSignal=signal<User |null>(null);

  user=this.userSignal.asReadonly();

  isLoggedIn =computed(()=> !!this.userSignal())


  initAuthState(){
    const user =sessionStorage.getItem('currentUser');
    if(user){
      this.userSignal.set(JSON.parse(user));
    }
  }

  register(user:User ){

    localStorage.setItem('registeredUser',JSON.stringify(user))
  }

  login(email:string,password:string):boolean{
    const savedUserInfo=localStorage.getItem('registeredUser');
    if(!savedUserInfo) return false;

    const savedUser:User=JSON.parse(savedUserInfo);

    if(savedUser.email===email && savedUser.password===password){
      this.userSignal.set(savedUser);
      return true
    }
    return false;
  }

  logOut(){
  sessionStorage.removeItem('currentUser');
  this.userSignal.set(null);
  this.watchlistService.clearWatchlist();
  }

}
