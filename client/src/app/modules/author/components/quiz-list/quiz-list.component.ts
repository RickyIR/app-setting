import { QuizGroup } from './../../../../interface/quiz';
import { UploadService } from './../../../../services/upload.service';
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';

@Component({
  selector: 'hd-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizzes: QuizGroup[];

  constructor(private upload: UploadService) { }

  ngOnInit() {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.upload.getQuizzesByGroup().subscribe((data) => {
      if(data){
        this.quizzes = data;
      }
    })
  }

  deleteQuizGroup(e: Event, quiz_group: string): void{
    try{
      e.preventDefault();

      if(!quiz_group){
        throw Error('quiz group is not defined');
      }

      this.upload.deleteQuiz(quiz_group).subscribe((status) => {
        if(status && status === 204){
          swal('Good', 'Quiz has been successfully removed');
          this.getQuizzes();
        }
      })

    }catch(e){
      swal('Oops', e.message, 'error');
    }
  }

}
