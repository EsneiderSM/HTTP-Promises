import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { SearchItem } from './../model/item.model'

@Injectable()
export class SearchService{
  apiRoot = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http:Http){
    this.results = [];
    this.loading = false; 
  }

  search(term: string): Observable<SearchItem[]>  {

      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      return this.http.get(apiURL)
        .map(res => { 
          return res.json().results.map(item => { 
            return new SearchItem( 
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
            );
          });
        });

  }

}