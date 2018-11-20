import { VideoPlayerComponent } from './../video/video-player/video-player.component';
import { SoundsService } from './../../../../../services/sounds.service';
import { VideoComponent } from './../video/video.component';
import { Quiz, QuizAnswer } from './../../../../../interface/quiz';
import { WorkshopComponent } from './../workshop.component';
import { UploadService } from './../../../../../services/upload.service';
import { AriaService } from './../../../../../services/aria.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'hd-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
  animations: [
    trigger('feedback', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('feedbackSecond', [
      transition(':enter', [
        style({ display: 'none', opacity: 0 }),
        animate('300ms 300ms ease-in-out', style({ display: 'block', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class KnowledgeComponent implements OnInit {

  knowledgeForm: FormGroup; // form
  QUESTIONS: Quiz[]; // all question
  currentQuestion: Quiz; // currect question

  /**
   * Answer id object;
   * @prop current: number - selected answer id
   * @prop last: number - last selected answer id before showCorrectAnswer
   */
  answerId = {
    current: 0,
    last: 0,
    default: () => {
      this.answerId.current = 0;
      this.answerId.last = 0;
    }
  };

  showCorrectAnswer = false;
  showResult: boolean = null;
  finished = false;

  constructor(private videoPlayerComponent: VideoPlayerComponent, private sound: SoundsService, private fb: FormBuilder, private el: ElementRef, private ariaService: AriaService, private WorkshopComponent: WorkshopComponent, private upload: UploadService, private VideoComponent: VideoComponent) {
  }

  ngOnInit() {
    if (this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.knowledge){
      this.upload.getQuiz(this.WorkshopComponent.workshop.knowledge).subscribe((data) => {
        if (data) {
          this.QUESTIONS = data;
          this.createQuestionForm();
        }
      })
    }
  }

  /**
   * Public function that creates questions form
   */
  public createQuestionForm(): void {
    /**
     * Creates form property for each question (to store answers)
     */
    const fbGroup = {};
    for (let i = 1; i < this.QUESTIONS.length + 1; i++) {
      fbGroup[`question_${i}`] = ['', Validators.required];
    }

    this.knowledgeForm = this.fb.group(fbGroup);

    /**
     * Starts with question #1
     */
    this.setQuestion(1);
  }

  /**
   * Public function that sets currentQuestion
   * @param id: number - Id of the question that will be set as a currentQuestion
   */
  public setQuestion(id: number): void {

    const currentQuestion: Quiz = _.find(this.QUESTIONS, {index: id});

    if (currentQuestion) {
      this.currentQuestion = currentQuestion;
      this.answerId.default();

      this.knowledgeForm.get(`question_${id}`).valueChanges.subscribe((val) => {
        this.answerId.current = val;
      });
    } else {

      console.error('Something went wrong');
    }
  }

  /**
   * Public function that sets the next question
   */
  public nextQuestion(): void {
    if (!this.showResult) {
      return;
    }
    if (this.currentQuestion.index < this.QUESTIONS.length) {
      this.setQuestion(this.currentQuestion.index + 1);

      const currentAnswer: any = this.knowledgeForm.get(`question_${this.currentQuestion.index}`);

      /**
       * Makes form enable
       */
      currentAnswer.enable();
      /**
       * Hides result and correct answer
       */
      this.showResult = null;
      this.showCorrectAnswer = false;

      /**
       * Removes selected answer
       */
      this.answerId.default();

      /**
       * If the question was answered before
       */
      if (currentAnswer.value) {
        this.answerId.current = currentAnswer.value;
        /**
         * the answer is correct
         */
        const isCurrentAnswerCorrect: QuizAnswer = _.find(this.currentQuestion.answers, {id: +currentAnswer.value, isCorrect: true});

        if (isCurrentAnswerCorrect) {
          /**
           * Shows correct answer and result
           */
          this.showResult = true;
          this.showCorrectAnswer = true;
          /**
           * Makes the form disabled
           */
          currentAnswer.disable();
        }
      }

      /**
       * Focus on the question
       */
      setTimeout(() => {
        this.el.nativeElement.querySelector('.knowledge-question').focus();
      }, 100);

    } else if (this.currentQuestion.index === this.QUESTIONS.length) {
      this.finished = true;
    }
  }

  /**
   * Public function that sets the prev question
   */
  public prevQuestion(): void {
    if (this.currentQuestion.index > 1) {
      this.setQuestion(this.currentQuestion.index - 1);

      /**
       * Focus on the question
       */
      setTimeout(() => {
        this.el.nativeElement.querySelector('.knowledge-question').focus();
      }, 100);

      const currentAnswer: any = this.knowledgeForm.get(`question_${this.currentQuestion.index}`);

      /**
       * Makes form enable
       */
      currentAnswer.enable();
      /**
       * Hides result and correct answer
       */
      this.showResult = null;
      this.showCorrectAnswer = false;

      /**
       * Removes selected answer
       */
      this.answerId.default();

      /**
       * If the question was answered before
       */
      if (currentAnswer.value) {
        this.answerId.current = currentAnswer.value;
        /**
         * the answer is correct
         */
        const isCurrentAnswerCorrect: QuizAnswer = _.find(this.currentQuestion.answers, {id: +currentAnswer.value, isCorrect: true});

        if (isCurrentAnswerCorrect) {
          /**
           * Shows correct answer and result
           */
          this.showResult = true;
          this.showCorrectAnswer = true;
          /**
           * Makes the form disabled
           */
          currentAnswer.disable();
        }
      }
    }
  }

  public showCorrectAnswerFunc(): void {
    const currentQuestion: Quiz = _.find(this.QUESTIONS, {index: this.currentQuestion.index});
    this.showCorrectAnswer = true;
    this.showResult = true;

    this.answerId.last = this.answerId.current;

    /** Currect question => correct answer */
    const currentAnswerCorrect: QuizAnswer = _.find(this.currentQuestion.answers, {isCorrect: true});

    this.knowledgeForm.get(`question_${this.currentQuestion.index}`).setValue(currentAnswerCorrect.id);

    setTimeout(() => {
      this.el.nativeElement.querySelector('.knowledge-content').focus();
    }, 100);
  }

  public getAnswerText(answerId: number): string {
    const currentAnswer: QuizAnswer = _.find(this.currentQuestion.answers, {id: +answerId});
    return (currentAnswer) ? currentAnswer.explanation : '';
  }

  public checkAnswer(): void {

    if (this.answerId.current) {
      /**
       * Checks if current answer id is correct
       */
      const isCurrentAnswerCorrect = _.find(this.currentQuestion.answers, {id: +this.answerId.current, isCorrect: true});

      if (isCurrentAnswerCorrect) {
        this.showResult = true; // True means the answer is correct
      } else {
        this.showResult = false; // False means the answer is wrong
      }

      if (isCurrentAnswerCorrect) {
        this.sound.play('bell');
      }

      this.knowledgeForm.get(`question_${this.currentQuestion.index}`).disable();

      setTimeout(() => {
        this.el.nativeElement.querySelector('.knowledge-result-title').focus();
      }, 100);

    } else {
      this.ariaService.ariaSwal({
        title: 'Oops',
        text: 'Please select an answer',
        type: 'error'
      });
    }
  }

  public tryAgain(): void {
    this.showResult = null;
    this.answerId.default();
    this.knowledgeForm.get(`question_${this.currentQuestion.index}`).setValue('');
    this.knowledgeForm.get(`question_${this.currentQuestion.index}`).enable();

    setTimeout(() => {
      this.el.nativeElement.querySelector('.knowledge-question').focus();
    }, 10);
  }

  /**
   * Public function that starts video for the current question.
   */
  public watchSegment(): void {
    $('html, body').animate({
        scrollTop: $('.able').offset().top - 50
    }, 500);

    try {
      this.videoPlayerComponent.watchSegment(this.currentQuestion.timeStamp, this.currentQuestion.timeStampEnd);

      this.tryAgain();

    } catch (e) {
      console.error(e.message);
    }
  }
}
