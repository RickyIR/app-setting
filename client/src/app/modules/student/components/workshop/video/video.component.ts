import { AriaService } from './../../../../../services/aria.service';
import { Workshop } from './../../../../../interface/main';
import { WorkshopComponent } from './../workshop.component';
import { Component, OnInit } from '@angular/core';

import printJS from 'print-js';
import swal from 'sweetalert2';
import download from 'downloadjs';

declare var $: any;

@Component({
  selector: 'hd-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public activeTab: string;
  workshop: Workshop;

  constructor(private WorkshopComponent: WorkshopComponent, private aria: AriaService) {
   }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip(function(e) {
      console.log(e);
    });

    if (this.WorkshopComponent.workshop) {
      this.workshop = this.WorkshopComponent.workshop;
    }
  }

  openTab(e: MouseEvent, tab: string): void{
    e.preventDefault();

    this.activeTab = (this.activeTab == tab ? undefined : tab);
  }

  print(doc: string): void{
    try{
      printJS({printable: doc, type:'pdf', showModal:true});

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  download(doc: string): void{
    try{
      download(doc);

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }
}
