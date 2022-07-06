import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {
  file: File;
  placeId: string;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: PlacesService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        this.router.navigate(['/']);
      }
      this.placeId = params.get('id');
    });
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.userId) {
          this.userId = this.router.getCurrentNavigation().extras.state.userId;
        }
      }
    });
  }
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  submitForm() {
    // if (this.file) {
      this.apiService
        .postPlacePhoto(this.file, this.placeId)
        .subscribe((response) => {
          if (response.res === 'success') {
            // const userId = response.data.lugar_id;
            this.router.navigate(['/home/' +  this.userId ]);
          }
          console.log(response);
        });
    // }
  }

  ngOnInit() {}
}
