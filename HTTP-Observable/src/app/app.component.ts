import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { SearchService } from './service/search.service';
import { SearchItem } from './model/item.model';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  private loading: boolean = false;
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;

  constructor(private itunes:SearchService){}

  ngOnInit(){
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .do( () => this.loading = true)
      .switchMap(term => this.itunes.search(term))
      .do( () => this.loading = false)
  }

  doSearch(term: string){
    this.loading = true;
    this.results = this.itunes.search(term);
  }
};
