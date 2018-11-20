import { Workshop } from './../../../../interface/main';
import { User } from './../../../../interface/user';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../../services/upload.service';

import swal from 'sweetalert2';
import _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'hd-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  public workshopForm: FormGroup;
  public authors: User[];
  public workshop: Workshop;

  constructor(private fb: FormBuilder, private upload: UploadService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe((item) => {
      this.workshop = undefined;

      if(item && item.name !== 'new'){
        this.upload.getWorkshop(item.name).subscribe((workshop) => {
          if (!workshop){
            this.router.navigate(['/author/workshop']);
          }else{
            this.workshop = workshop;
            this.createForm(workshop);
          }
        })
      }else{
        this.workshop = null;
        this.createForm();
      }
    })
  }

  createForm(workshop?: Workshop): void{

    this.workshopForm = this.fb.group({
      title: [(workshop && workshop.name ? workshop.name : ''), Validators.required],
      permalink: [(workshop && workshop.permalink ? workshop.permalink : ''), Validators.required],
      description: [(workshop && workshop.description ? workshop.description : ''), Validators.required],
      author: [(workshop && workshop.author._id ? workshop.author.name.first + ' ' + workshop.author.name.last + ' - ' + workshop.author._id : ''), Validators.required],
      series: [(workshop && workshop.series ? workshop.series.name : ''), Validators.required],
      tags: [(workshop && workshop.tags && workshop.tags.length ? workshop.tags.join(',') : ''), Validators.required],
      ratingQuestion: [(workshop && workshop.rating.question ? workshop.rating.question : ''), Validators.required],
      resources: [(workshop && workshop.files.resources ? workshop.files.resources : '')],
      mp4: [(workshop && workshop.files.mp4 ? workshop.files.mp4 : '')],
      mp3: [(workshop && workshop.files.mp3 ? workshop.files.mp3 : '')],
      captions: [(workshop && workshop.files.captions ? workshop.files.captions : ''), Validators.required],
      transcript: [(workshop && workshop.files.transcript ? workshop.files.transcript : '')],
      poster: [(workshop && workshop.files.poster ? workshop.files.poster : ''), Validators.required]
    })

    console.log(this.workshopForm);

    this.workshopForm.get('author').valueChanges.subscribe(val => {
      this.getAuthors(val);
    })
  }

  workshopFormSubmit(formValues): void {
    try {
      let values = formValues;

      if (!values){
        throw Error('Workshop Form is not defined');
      }

      if (this.workshopForm.invalid){
        throw Error('Workshop Form is invalid.');
      }

      if (values.author.length !== 24){
        let author = _.split(values.author, ' - ');

        if (!author[1]){
          throw Error('Author is not correct. Please choose one from the list.');
        }

        values.author = author[1];
      }

      if(this.workshop){
        this.upload.updateWorkshop(this.workshop._id, values).subscribe((status) => {
          if(status && status === 204){
            swal('Good', 'Workshop has been updated!', 'success').then(() => {
              this.router.navigate(['/author/workshop']);
            })
          }
        })
      }else{
        this.upload.createNewWorkshop(values).subscribe((status) => {
          if(status && status === 201){
            swal('Good', 'New workshop has been successfully created!', 'success').then(() => {
              this.router.navigate(['/author/workshop']);
            })
          }
        })
      }
    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  getAuthors(query: string): void{

    if (!query){
      $('.live-search').removeClass('show');
      return;
    }

    this.upload.getAuthors(query).subscribe((authors) => {
      if (authors){
        this.authors = authors.data;

        $('.live-search').addClass('show');

        $('body').on('click', function bodyEvent(e){
          if($(e.target).hasClass('dropdown-item')){
            e.stopPropagation();
          }

          $('.live-search').removeClass('show');

          $('body').off('click', bodyEvent);
        });
      }
    })
  }

  selectAuthorFromLiveSearch(e: Event, name: string, _id: string): void{
    e.preventDefault();

    this.workshopForm.get('author').setValue(name + ' - ' + _id);
  }
}
