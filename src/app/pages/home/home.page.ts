import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { Place } from 'src/app/models/Place';
import { PlacesService } from 'src/app/services/places.service';
import { Foto } from '../../models/Foto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
objPerson: Person;
userId: string;
listPlaces: Place[] = [];






  constructor(private route: ActivatedRoute,private router: Router, private apiService: PlacesService) {
    this.route.paramMap.subscribe(params => {
      if (!params.has('id')) {
        this.router.navigate(['/']);
      }
      this.userId = params.get('id');
      this.loadListPlaces(params.get('id'));
  });
  }
  loadListPlaces(id: string) {
    this.apiService.getListPlaces(id).subscribe((response)=>{
      if(response.res === 'success'){
        this.listPlaces = response.data;
      }
      console.log(response);

    });
  }
  navigate2PlaceForm(){
    this.router.navigate(['/place-form/'+this.userId]);
  }
  onpickupClick(){
    this.router.navigate(['maps/'+this.userId]);

  }

  calculateURL(fotos: Foto[]){
    if(fotos.length<1){
      return 'https://cdn.onlinewebfonts.com/svg/img_207058.png';
    }else{
      return fotos[0].url;
    }
  }


  showDetail(placeId: number) {
    const navigationextras: NavigationExtras = {
      state: {
        placeId: placeId.toString()
      }
    };
    this.router.navigate(['/place-form/'+this.userId], navigationextras);
  }







}
