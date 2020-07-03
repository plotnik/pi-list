import { Component, OnInit } from '@angular/core';
import { CowonAlbum } from './cowon.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * How to Build Your First Ionic 4 App with API Calls::
 * https://ionicacademy.com/ionic-4-app-api-calls/
 */
@Component({
  selector: 'app-cowon',
  templateUrl: './cowon.page.html',
  styleUrls: ['./cowon.page.scss'],
})
export class CowonPage implements OnInit {

  dataUrl = "http://192.168.100.7:8080/pi/cowon";

  searchQuery = '';
  cowon: CowonAlbum[];
  results: CowonAlbum[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadJson().subscribe(data => {
      this.cowon = data;
      this.results = data;
    });
  }

  loadJson(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  albumCover(a: CowonAlbum) {
    return a.cover ? 'http://aerostat-music.netlify.app' + a.cover :
      'https://www.dhivehilyrics.com/images/album/default.jpg';
  }

  albumName(a: CowonAlbum) {
    return (a.drive=='x9'?'1':'2') + ':' + a.az + '/' + (a.artist? a.artist + '/':'') + a.name;
  }

  searchChanged() {
    if (this.searchQuery.length == 0) {
      this.results = this.cowon;
    } else {
      let q = this.searchQuery.toLowerCase();
      this.results =this.cowon.filter(a => { 
        return a.name.toLowerCase().indexOf(q)>=0 || 
              (a.artist && a.artist.toLowerCase().indexOf(q)>=0); 
      });
    }
  }

  moveUp(a: CowonAlbum) {
    console.log("moveUp:", a);
  }
}
