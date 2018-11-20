import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Workshop } from '../../../../interface/main';
import { UploadService } from '../../../../services/upload.service';

@Component({
  selector: 'hd-workshop-dashboard',
  templateUrl: './workshop-dashboard.component.html',
  styleUrls: ['./workshop-dashboard.component.scss']
})
export class WorkshopDashboardComponent implements OnInit {

  public workshops: Workshop[];

  constructor(private upload: UploadService, private titleService: Title) { }

  ngOnInit() {
    this.upload.getAllWorkshops().subscribe((workshops) => {
      this.workshops = workshops;

      this.titleService.setTitle(`All workshops · Hadley.edu`);
    })
  }

}
