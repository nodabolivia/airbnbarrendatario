import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {Map,tileLayer,marker} from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  userId: string;
  map: Map;
  newMarker: any;
  address: string[];
    // constructor(private route: ActivatedRoute, private router: Router, private geocoder?: NativeGeocoder) {
    constructor(private route: ActivatedRoute, private router: Router) {
      this.route.paramMap.subscribe(params => {
        if (!params.has('id')) {
          this.router.navigate(['/']);
        }
        this.userId = params.get('id');
    });
     }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.loadMap();
  }


  loadMap(){
    this.map = new Map('mapId').setView([-17.768985308506966, -63.18287208650913], 15);
    const tileOptions= `'Map data © <a
    href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
   <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-
   SA</a>'`;
    tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: tileOptions }
    ).addTo(this.map); // This line is added to add the Tile Layer to our map
      }

  goBack(){
    this.router.navigate(['/place-form/'+this.userId]);

    // this.router.navigate(['/home/'+this.userId]);
        // this.router.navigate(['home']);

 }

      locatePosition(){
        this.map.setZoom(15);
        this.map.locate({setView:true}).on('locationfound', (e: any)=> {
          this.newMarker = marker([e.latitude,e.longitude], {draggable:
          true}).addTo(this.map);
          this.newMarker.bindPopup('Tu ubicación actual').openPopup();
            console.log(e.latitude, e.longitude);
          this.getAddress(e.latitude, e.longitude);
          this.newMarker.on('dragend', ()=> {
            const position = this.newMarker.getLatLng();
            console.log(e.latitude, e.longitude);

            this.getAddress(position.lat, position.lng);
           });
        });
      }










      getAddress(lat: number, long: number) {
        this.address = [lat.toString(), long.toString()];
        console.log({lat, long});
      }

      // getAddress(lat: number, long: number) {
      //   const options: NativeGeocoderOptions = {
      //     useLocale: true,
      //     maxResults: 5
      //   };
      //   this.geocoder.reverseGeocode(lat, long, options)
      //   .then((result: NativeGeocoderResult[]) => {
// console.log(JSON.stringify(result[0]);
//  this.address = JSON.stringify(results[0]);
      // }))
      //   .catch((error: any) => console.log(error));
      // }

      confirmPickupLocation() {
        const navigationextras: NavigationExtras = {
          state: {
            pickupLocation: this.address
          }
        };
        // this.router.navigate(["home"], navigationextras);
        this.router.navigate(['/place-form/'+this.userId], navigationextras);
      }


}
