import { Component, inject, signal } from '@angular/core';
import { WatchlistService } from '../../services/watchlist-service/watchlist-service';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule ,NgbCollapseModule  } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from '../../services/lang-service/lang-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgbDropdownModule,NgbCollapseModule ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  watchlistService=inject(WatchlistService);
  isNavbarCollapsed = signal<boolean>(true);
  langService=inject(LangService)

  lang=this.langService.language;

  changeLang(lang: 'en' | 'ar' | 'fr' | 'zh'){
    this.langService.setLanguage(lang)
  }


}
