import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  // http://bnb.jmacboy.com/api/reservas/lugar/1
  baseURL = 'http://bnb.jmacboy.com/api/reservas/lugar/';

  constructor(private http: HttpClient) { }

  getListBookings(placeId: string): Observable<any>{
    return this.http.get(this.baseURL +placeId);
    // return this.http.get(this.baseURL +'21');
  }
}
