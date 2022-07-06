import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/Place';
import { NavController } from '@ionic/angular';
import { Foto } from '../../models/Foto';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.page.html',
  styleUrls: ['./place-form.page.scss'],
})
export class PlaceFormPage implements OnInit {
  coords: string[];
  src: string;
  placeId: string;
  userId: string;
  formPlace = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
    descripcion: new FormControl('', [Validators.required]),
    cantPersonas: new FormControl('', [Validators.required]),
    cantCamas: new FormControl('', [Validators.required]),
    cantBanios: new FormControl('', [Validators.required]),
    cantHabitaciones: new FormControl('', [Validators.required]),
    tieneWifi: new FormControl('', [Validators.required]),
    cantVehiculosParqueo: new FormControl('', [Validators.required]),
    precioNoche: new FormControl('', [Validators.required]),
    costoLimpieza: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    private apiService: PlacesService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        this.router.navigate(['/']);
      }
      this.userId = params.get('id');

      this.route.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          if (this.router.getCurrentNavigation().extras.state.placeId) {
            this.placeId =
              this.router.getCurrentNavigation().extras.state.placeId;
            console.log(this.placeId);
            this.getPlace();
          }
          if (this.router.getCurrentNavigation().extras.state.pickupLocation) {
            this.coords =
              this.router.getCurrentNavigation().extras.state.pickupLocation;
          }
        }
      });
    });
  }

  ngOnInit() {}
  createPlace() {
    const nombre = this.formPlace.get('nombre').value;
    const descripcion = this.formPlace.get('descripcion').value;
    const cantPersonas = this.formPlace.get('cantPersonas').value;
    const cantCamas = this.formPlace.get('cantCamas').value;
    const cantBanios = this.formPlace.get('cantBanios').value;
    const cantHabitaciones = this.formPlace.get('cantHabitaciones').value;
    const tieneWifi = this.formPlace.get('tieneWifi').value;
    const cantVehiculosParqueo = this.formPlace.get(
      'cantVehiculosParqueo'
    ).value;
    const precioNoche = this.formPlace.get('precioNoche').value;
    const costoLimpieza = this.formPlace.get('costoLimpieza').value;
    const ciudad = this.formPlace.get('ciudad').value;
    const latitud = this.coords[0];
    const longitud = this.coords[1];
    const objPlace: Place = {
      nombre,
      descripcion,
      cantPersonas,
      cantCamas,
      cantBanios,
      cantHabitaciones,
      tieneWifi,
      cantVehiculosParqueo,
      precioNoche,
      costoLimpieza,
      ciudad,
      latitud,
      longitud,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      arrendatario_id: this.userId,
    };
    this.apiService.postPlace(objPlace).subscribe((response) => {
      if (response.res === 'success') {
        this.placeId = response.data.id;
        this.navigate2Images();
      }
      console.log(response);
    });
  }

  getPlace() {
    this.apiService.getPlace(this.placeId).subscribe((response) => {
      if (response.res === 'success') {
        const objPlaceResponse = response.data as Place;
        this.formPlace.get('nombre').setValue(objPlaceResponse.nombre);
        this.formPlace
          .get('descripcion')
          .setValue(objPlaceResponse.descripcion);
        this.formPlace
          .get('cantPersonas')
          .setValue(objPlaceResponse.cantPersonas);
        this.formPlace.get('cantCamas').setValue(objPlaceResponse.cantCamas);
        this.formPlace.get('cantBanios').setValue(objPlaceResponse.cantBanios);
        this.formPlace
          .get('cantHabitaciones')
          .setValue(objPlaceResponse.cantHabitaciones);
        this.formPlace.get('tieneWifi').setValue(objPlaceResponse.tieneWifi);
        this.formPlace
          .get('cantVehiculosParqueo')
          .setValue(objPlaceResponse.cantVehiculosParqueo);
        this.formPlace
          .get('precioNoche')
          .setValue(objPlaceResponse.precioNoche);
        this.formPlace
          .get('costoLimpieza')
          .setValue(objPlaceResponse.costoLimpieza);
        this.formPlace.get('ciudad').setValue(objPlaceResponse.ciudad);
        this.coords = [objPlaceResponse.latitud, objPlaceResponse.longitud];
        this.calculateURL(objPlaceResponse.fotos);
      }

      console.log(response);
    });
  }

  calculateURL(fotos: Foto[]) {
    if (fotos.length < 1) {
      this.src = 'https://cdn.onlinewebfonts.com/svg/img_207058.png';
    } else {
      this.src = fotos[0].url;
    }
  }

  navigate2Images() {
    const navigationextras: NavigationExtras = {
      state: {
        userId: this.userId,
      },
    };
    this.navCtrl.setDirection('forward');
    // this.router.navigate(['/images/'+ this.placeId]);
    this.router.navigate(['/images/' +  this.placeId], navigationextras);
  }
  navigate2Home() {
    this.navCtrl.setDirection('back');
    this.router.navigate(['/home/' + this.userId]);
  }

  onpickupClick() {
    this.router.navigate(['maps/' + this.userId]);
  }
  showBookings() {
    this.router.navigate(['booking-list/' + this.placeId]);
  }
}
