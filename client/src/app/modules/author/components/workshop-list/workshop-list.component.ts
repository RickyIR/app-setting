import { Router } from '@angular/router';
import { Workshop } from './../../../../interface/main';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';

@Component({
  selector: 'hd-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.scss']
})
export class WorkshopListComponent implements OnInit {

  public workshops: Workshop[];

  constructor(private upload: UploadService, private router: Router) { }

  ngOnInit() {
   this.getAllWorkshops();
  }

  getAllWorkshops(): void{
    this.upload.getAllWorkshops().subscribe((data) => {
      if (data){
        this.workshops = data;
      }
    });
  }

  deleteWorkshop(e: Event, workshop_id: string): void {

    e.preventDefault();

    this.upload.deleteWorkshop(workshop_id).subscribe((statusCode) => {
      if (statusCode && statusCode === 204){
        swal('Good', 'Workshop has been successfully deleted', 'success');

        this.getAllWorkshops();
      }
    });
  }

  editWorkshop(e: Event, workshop_name: string): void {
    e.preventDefault();

    this.router.navigate(['/author/workshop', workshop_name]);
  }

}
