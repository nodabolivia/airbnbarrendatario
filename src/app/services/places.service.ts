import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models/Place';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  baseURL = 'http://bnb.jmacboy.com/api/lugares';
  constructor(private http: HttpClient) {}

  getListPlaces(userId: string): Observable<any> {
    return this.http.get(this.baseURL + '/arrendatario/' + userId);
  }
  getPlace(placeId: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + placeId);
  }

  postPlace(place: Place): Observable<any> {
    const headers = {
      'content-type': 'application/json',
    };
    const body = JSON.stringify(place);
    return this.http.post(this.baseURL, body, { headers });
  }

  //  postPlacePhoto(): Observable<any>{
  //   // http://bnb.jmacboy.com/api/lugares/35/foto
  //  }

  postPlacePhoto(file: File, placeId: string): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file, file.name);
    return this.http.post(this.baseURL + '/' + placeId + '/foto', formData);
  }
}
