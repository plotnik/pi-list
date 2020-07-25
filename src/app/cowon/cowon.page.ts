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

  baseUrl = 'http://192.168.100.7:8080/pi';

  searchQuery = '';
  results: CowonAlbum[];
  skip = 0;
  limit = 20;

  constructor(private http: HttpClient) { }

  // инициализация страницы
  ngOnInit() {
    this.reload();
  }

  // загрузить содержимое страницы с учетом параметров поиска, а также skip и limit
  loadJson(): Observable<any> {
    let url = this.baseUrl + '/cowon?skip=' + this.skip + '&limit=' + this.limit;
    if (this.searchQuery) {
      url += '&q=' + this.searchQuery;
    }
    return this.http.get(url);
  }

  // линк на обложку альбома
  albumCover(a: CowonAlbum) {
    return a.cover ? 'http://aerostat-music.netlify.app' + a.cover :
      'https://www.dhivehilyrics.com/images/album/default.jpg';
  }

  // сигнатура альбома
  albumName(a: CowonAlbum) {
    return (a.drive === 'x9' ? '1' : '2') + ':' + a.az + '/' + (a.artist ? a.artist + '/' : '') + a.name;
  }

  // критерий поиска изменился
  reload() {
    this.loadJson().subscribe(data => {
      this.results = data;
    });
  }

  // отправляем альбом наверх списка
  moveUp(a: CowonAlbum) {
    console.log('moveUp:', a);
    this.http.post(this.baseUrl + '/cowon/up', a).subscribe(data => {
      this.reload();
    });
  }

  loadMore(event) {
    this.skip += this.limit;
    this.loadJson().subscribe(data => {
      this.results = this.results.concat(data);
      event.target.complete();
      if (data.length === 0) {
        event.target.disabled = true;
      }
    });
  }

  doRefresh(event) {
    this.skip = 0;
    this.limit = 20;
    this.loadJson().subscribe(data => {
      this.results = data;
      event.target.complete();
    });
  }
}
