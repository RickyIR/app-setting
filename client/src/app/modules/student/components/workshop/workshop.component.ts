import { Workshop } from './../../../../interface/main';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hd-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {

  public workshop: Workshop;
  public showAlert: Boolean;

  constructor(private upload: UploadService, private route: ActivatedRoute, private titleService: Title) {
    this.showAlert = false;
   }

  ngOnInit() {
    this.route.paramMap.subscribe((route) => {
      if (route.get('name')) {
        this.getWorkshop(route.get('name'));
      }
    })
  }

  getWorkshop(name: string) {
    this.workshop = undefined;
    this.upload.getWorkshop(name).subscribe((workshop) => {
      if (workshop) {
        this.workshop = workshop;
        this.titleService.setTitle(`${workshop.name} · Hadley.edu`);
      }
    });
  }
}
