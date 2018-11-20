import { AriaService } from './../../../../../services/aria.service';
import { WorkshopComponent } from './../workshop.component';
import { WorkshopRating } from './../../../../../interface/main';
import { Component, OnInit, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import _ from 'lodash';
import swal, { SweetAlertResult } from 'sweetalert2';
import { SwalPartialTargets, SwalComponent } from '@toverux/ngx-sweetalert2';

declare var $: any;

@Component({
  selector: 'hd-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  @ViewChild('ratingSwal') public ratingSwal: SwalComponent;
  @Input('showAlert') public showAlert: String;
  public ratingInformation: WorkshopRating;
  public feedbackForm: FormGroup;
  public responseSubmitted: Boolean = false;

  constructor(private fb: FormBuilder, private aria: AriaService, public readonly swalTargets: SwalPartialTargets, private WorkshopComponent: WorkshopComponent) {
   }

  ngOnInit() {
    if (this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.rating){
      this.ratingInformation = this.WorkshopComponent.workshop.rating;

      this.createRatingForm();
    }
  }

  ngOnChanges(): void {
    if(this.showAlert === 'true'){
      this.ratingSwal.show();
    }
  }


  createRatingForm(): void {
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      feedback: ['', [Validators.maxLength(this.ratingInformation.limit)]]
    });
  }

  public preConfirmFeedback(): Promise<any> {
    return new Promise((resolve, reject) => {

      try{
        resolve();

      }catch(e){
        console.error(e);
        $('.swal2-validationerror').css({display: 'flex'});
      }
    })
  }

  public submitFeedback(feedback: FormGroup): void {
    if(!feedback || !feedback.get('rating').value){
      return;
    }

    this.aria.ariaSwal({
      onBeforeOpen: (dom) => {
        $('.swal2-success-line-tip').css({
          backgroundColor: '#3F7620!important'
        });
        $('.swal2-success-line-long').css({
          backgroundColor: '#3F7620!important'
        });
      },
      title: 'Thank you for your feedback!',
      type: 'success'
    })
  }

  // runAlert(): void {
  //   try{
  //     this.ratingSwal.show();
  //   }catch(e){
  //     swal('Oops', e.message || 'Something went wrong', 'error');
  //   }
  // }
}
