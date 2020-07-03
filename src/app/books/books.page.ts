import { Component, OnInit } from '@angular/core';
import { Book } from './books.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  
  dataUrl = "http://192.168.100.7:8080/pi/books";
  books: Book[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadJson().subscribe(data => {
      this.books = data;
    });
  }

  loadJson(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

}
