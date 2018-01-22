import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private loading: boolean = false;
  constructor(private itunes:SearchService){}

  doSearch(term: string){
    this.loading = true;
    this.itunes.search(term).then(() => this.loading = false);
  }
};
