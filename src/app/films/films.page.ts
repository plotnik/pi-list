import { Component, OnInit } from '@angular/core';
import { Film } from './films.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  dataUrl = "http://192.168.100.7:8080/pi/films";
  films: Film[];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadJson().subscribe(data => {
      this.films = data;
    });    
  }

  loadJson(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
