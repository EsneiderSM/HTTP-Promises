import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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

  search(term: string){
    let promise = new Promise((resolve, reject) =>{
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => {
            this.results = res.json().results.map( item =>{

              return new SearchItem(
                  item.trackName,
                  item.artistName,
                  item.trackViewUrl,
                  item.artworkUrl30,
                  item.artistId
              )

            });
            resolve();
          },
          msg => {
            reject();
          }
        )
    });

    return promise;
  }

}