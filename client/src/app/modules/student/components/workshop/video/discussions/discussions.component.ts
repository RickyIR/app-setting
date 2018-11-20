import { Workshop } from './../../../../../../interface/main';
import { Discussion } from './../../../../../../interface/discussion';
import { WorkshopComponent } from './../../workshop.component';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UploadService } from '../../../../../../services/upload.service';

@Component({
  selector: 'hd-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  discussions: Discussion[];
  workshop: Workshop;

  constructor(private upload: UploadService, private WorkshopComponent: WorkshopComponent) {
   }

  ngOnInit() {
    if (this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.discussions){
      this.upload.getDiscussions(this.WorkshopComponent.workshop.discussions).subscribe((data) => {
        if (data) {
          this.discussions = data;
          this.workshop = this.WorkshopComponent.workshop;
        }
      })
    }
  }
}
