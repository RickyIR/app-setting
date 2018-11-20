import { Router } from '@angular/router';
import { Quiz, QuizGroup } from './../../../../interface/quiz';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import _ from 'lodash';

@Component({
  selector: 'hd-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  public currentQuestion: Quiz;
  public questions: Quiz[];
  public answerForm: FormGroup;

  constructor(private upload: UploadService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.questions = [];
    this.answerForm = this.fb.group({
      answer: ['', Validators.required],
      isCorrect: [false, Validators.required],
      explanation: ['', Validators.required]
    })
  }

  addAnswer(value): void {
    try{
      if(!value || !value.answer){
        throw Error('value is not defined.');
      }

      if(!this.currentQuestion){
        throw Error('Please select question to edit.');
      }

      if(value.isCorrect){
        let correctAnswer = _.find(this.currentQuestion.answers, {isCorrect: true});

        if(correctAnswer){
          throw Error('Only once answer should be correct.')
        }
      }

      this.currentQuestion.answers.push({
        id: this.currentQuestion.answers.length + 1,
        answer: value.answer,
        isCorrect: value.isCorrect,
        explanation: value.explanation
      });

      this.answerForm.setValue({
        explanation: '',
        answer: '',
        isCorrect: false
      });

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  createQuestion(): void{
    try{

      (swal as any).mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Question',
          text: 'Please Enter Your Question'
        },
        {
          title: 'Time Stamp',
          text: 'Format: "hh:mm:ss" or "mm:ss"'
        },
        {
          title: 'Time Stamp End',
          text: 'Format: "hh:mm:ss" or "mm:ss"'
        }
      ]).then((result) => {
        if (result.value) {
          try{
            if (!result.value[0] || !result.value[1]){
              throw Error('Question and Time Stamp are required.');
            }

            this.questions.push({
              question: result.value[0],
              index: this.questions.length + 1,
              quizzes_group: undefined,
              allowShowAnswer: true,
              allowTryAgain: true,
              timeStamp: result.value[1],
              timeStampEnd: result.value[2],
              answers: []
            })

            this.answerForm.setValue({
              explanation: '',
              answer: '',
              isCorrect: false
            });

            this.currentQuestion = _.last(this.questions);

          }catch(e){
            swal('Oops', e.message, 'error');
          }

        }
      })

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  saveQuestion(): void{
    try{
      this.currentQuestion = undefined;
    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  editQuestion(index: number): void{
    try{
      this.currentQuestion = _.find(this.questions, {index: index});

      if (!this.currentQuestion){
        throw Error('Something went wrong. Question is not found. Please try again.')
      }

      this.answerForm.setValue({
        explanation: '',
        answer: '',
        isCorrect: false
      });

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  removeQuestion(id: number): void {
    try{
      if(!id && id !== 0){
        throw Error('id is not defined');
      }

      this.questions.splice(id, 1);

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  removeAnswer(e: Event, id: number): void {
    try{
      e.preventDefault();

      if(!id && id !== 0){
        throw Error('id is not defined');
      }

      this.currentQuestion.answers.splice(id, 1);

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

  saveQuiz(): void{
    try{
      if(!this.questions || !this.questions.length){
        throw Error('Questions are not specified');
      }

      _.each(this.questions, (item) => {
        if (!item.answers || !item.answers.length){
          throw Error(`Question '${item.question}' does not have any answers.`);
        }
      })

      this.upload.getAllWorkshops().subscribe((data) => {
        if(data && data.length){

          data = _.filter(data, w => !w.knowledge);

          let keys = _.map(data, w => w._id);
          keys.unshift('');

          let values = _.map(data, w => w.name);
          values.unshift('No workshop');

          let options = _.zipObject(keys, values);

          swal({
            title: 'Workshop for the quiz',
            input: 'select',
            inputOptions: options,
            // inputPlaceholder: 'Select workshop',
            showCancelButton: true,
          }).then((res) => {
            if(res.value){
              this.questions = _.map(this.questions, (i) => {
                i.workshop = res.value;
                return i;
              })
            }

            this.upload.createQuiz(this.questions).subscribe((status) => {
              if(status && status == 201){
                swal('Good', 'Quiz has been successfully created', 'success');
                this.router.navigate(['/author/quiz'])
              }
            });
          })
        }
      })
    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

}
