import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private langSignal: WritableSignal<'en' | 'ar' | 'fr' | 'zh'> = signal<'en' | 'ar' | 'fr' | 'zh'>('en');
  
  language = computed(() => this.langSignal());

  setLanguage(lang: 'en' | 'ar' | 'fr' | 'zh'){
    this.langSignal.set(lang);
  }

  get languageParam(){
    return {language:this.langSignal()}
  }

  constructor(){
    effect(()=>{
      const currentLang=this.langSignal();
      document.documentElement.dir= currentLang ==='ar'? 'rtl' : 'ltr';
    })
  }
}
