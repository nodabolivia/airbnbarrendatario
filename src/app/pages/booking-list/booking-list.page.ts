import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../../services/bookings.service';
import { Bookings } from '../../models/Bookings';
import { Foto } from 'src/app/models/Foto';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
})
export class BookingListPage implements OnInit {
  placeId: string;
  listBookings: Bookings[] = [];

  cantDays: number;




  photo: string;
  cantNights: string;
  arrivalDate: string;
  departureDate: string;
  clientName: string;
  price: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: BookingsService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        // this.router.navigate(['/']);
      }
      this.placeId = params.get('id');
      this.loadListPlaces(params.get('id'));
    });
  }

  loadListPlaces(id: string) {
    this.apiService.getListBookings(id).subscribe((response) => {
      if (response.res === 'success') {
        this.listBookings = response.data;
        console.log(this.listBookings);
      }
      console.log(response);

    });
  }

calculateDays(d1: Date, d2: Date) {
  const endDate = new Date(d1);
  const startDate = new Date(d2);
  const time = endDate.getTime() - startDate.getTime();
  this.cantDays =  Math.abs(time / (1000 * 3600 * 24)) ;
  return this.cantDays;
}
calculateNights(d1: Date, d2: Date) {
  const endDate = new Date(d1);
  const startDate = new Date(d2);
  const time = endDate.getTime() - startDate.getTime();
  this.cantDays =  Math.abs(time / (1000 * 3600 * 24)) ;
  this.cantNights = (this.cantDays - 1 ).toString();
  return this.cantNights;
}
calculateURL(fotos: Foto[]){
  if(fotos.length<1){
    return 'https://cdn.onlinewebfonts.com/svg/img_207058.png';
  }else{
    return fotos[0].url;
  }
}
calculatePrice(){
  // "fechaInicio": "2022-07-18",
  // "fechaFin": "2022-07-21",
  // "precioTotal": "50.00",
  // "precioLimpieza": "20.00",
  // "precioNoches": "12.00",
  // "precioServicio": "100.00",
}








  ngOnInit() {}
}
