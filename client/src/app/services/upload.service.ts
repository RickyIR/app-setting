import { User } from './../interface/user';
import { Discussion } from './../interface/discussion';
import { Quiz, QuizGroup } from './../interface/quiz';
import { Response, ResponsePaginated } from './../interface/response';
import { Workshop } from './../interface/main';
import { Injectable } from '@angular/core';
import { Observable, observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap, scan, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public api_link: string;

  constructor(private http: HttpClient) {
    this.api_link = '/api';
  }

  createNewWorkshop(workshop: Workshop): Observable<number>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Response>(`${this.api_link}/workshop`, JSON.stringify(workshop), httpOptions).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.status),
      catchError((err: HttpErrorResponse) => {
        console.log(err.error.message);
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  updateWorkshop(workshop_id: string, workshop: Workshop): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Response>(`${this.api_link}/workshop/${workshop_id}`, JSON.stringify(workshop), httpOptions).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.status),
      catchError((err: HttpErrorResponse) => {
        console.log(err.error.message);
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  deleteWorkshop(workshop_id: string): Observable<number> {
    return this.http.delete<Response>(`${this.api_link}/workshop/${workshop_id}`).pipe(
      tap((response) => this.handleResponse(response)),
      map((response) => response.status),
      catchError((err: HttpErrorResponse) => {
        console.log(err.error.message);
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  getAllWorkshops(): Observable<Workshop[]>{
    return this.http.get<Response>(`${this.api_link}/workshop`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    );
  }
  /**
   * Getting workshop information from the database
   * @param name - the name of the workshop
   */
  getWorkshop(name: string): Observable<Workshop> {
    return this.http.get<Response>(`${this.api_link}/workshop/${name}`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    );
  }

  getQuiz(quiz_group_id: string): Observable<Quiz[]> {
    return this.http.get<Response>(`${this.api_link}/quiz/${quiz_group_id}`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  deleteQuiz(quiz_group_id: string): Observable<number> {
    return this.http.delete<Response>(`${this.api_link}/quiz/${quiz_group_id}`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.status),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  createQuiz(quizzes: Quiz[]): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Response>(`${this.api_link}/quiz/`, JSON.stringify(quizzes), httpOptions).pipe(
      tap((response) => this.handleResponse(response)),
      map((response: Response) => response.status),
      catchError((err: HttpErrorResponse) => {
        console.log(err.error.message);
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  getQuizzesByGroup(): Observable<QuizGroup[]> {
    return this.http.get<Response>(`${this.api_link}/quiz/groups/`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  getDiscussions(discussions_group_id: string): Observable<Discussion[]> {
    return this.http.get<Response>(`${this.api_link}/discussion/${discussions_group_id}`).pipe(
      tap((response) => this.handleResponse(response)),
      map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  getAuthors(query: string, options?: any): Observable<ResponsePaginated> {
    let params = new HttpParams();

    params = params.append('q', query);

    return this.http.get<ResponsePaginated>(`${this.api_link}/user/author/`, {params: params}).pipe(
      // tap((response) => this.handleResponse(response)),
      // map(response => response.data),
      catchError((err: HttpErrorResponse) => {
        swal('Oops', err.error.message, 'error');
        return throwError(err);
      })
    )
  }

  // getVideo(name: string): Observable<Video> {
  // /**
  //  * Getting Video from DataBase
  //  */

  // if (name === 'Setting_Accessibility_Shortcuts') {

  //   const obs_video: Observable<Video> = new Observable((observer) => {
  //     setTimeout(() => {
  //       observer.next({
  //         id: 927,
  //         name: 'Setting Accessibility Shortcuts',
  //         author: {
  //           name: 'Douglas Walker',
  //           photo_link: 'assets/images/icon-prof2.jpg',
  //           url: '#lecture'
  //         },
  //         description: 'How to use the Apple Accessibility Features on the iPhone, iPad & iPod Touch. This video walks you through how to set the Accessibility Shortcuts. We’ll show you how to quickly turn on and off selected accessibility features with a simple triple click of your home button.',
  //         duration: '10:49',
  //         tags: [{
  //           id: 1,
  //           title: 'iPhone',
  //           link: '#category-iphone'
  //         },
  //         {
  //           id: 2,
  //           title: 'Beginner',
  //           link: '#category-beginner'
  //         },
  //         {
  //           id: 3,
  //           title: 'Technology',
  //           link: '#category-technology'
  //         }],
  //         videoFiles_group_id: 500,
  //         discussion_group_id: 600,
  //         knowledge_group_id: 700,
  //         rating_group_id: 800,
  //         resources_group_id: 900
  //       });
  //       observer.complete();
  //     }, 0);
  //   });

  //   /**
  //    * Load APIMap at the first time.
  //    */

  //   return obs_video;
  // }
  // }

  /**
   * Gets APIMap by map_id (map_id is defined in VideoMap)
   */
  // getApiMap(map_id: number): Observable<APIMap> {
  //   if (map_id === 1024) {
  //     /**
  //      * Getting api_map from DataBase
  //      */
  //     const obs_api = new Observable((observer) => {
  //       setTimeout(() => {
  //         observer.next({
  //           id: 1024,
  //           videoFiles_group_id: 500,
  //           discussion_group_id: 600,
  //           knowledge_group_id: 700,
  //           rating_group_id: 800
  //         });

  //         observer.complete();
  //       }, 500);
  //     });

  //     /**
  //      * Saves last APIMap in this.APIMap
  //      */

  //     return obs_api.pipe(
  //       tap((api_data: APIMap) => {
  //         if (!this.APIMap || this.APIMap.id !== api_data.id) {
  //           this.APIMap = api_data;
  //         }
  //       })
  //     );
  //   }
  // }

  /**
   * Gets knowledge group by knowledge_group_id (knowledge_group_id is defined in APIMap)
   */
  // getKnowledgeMap(knowledge_group_id: number): Observable<KnowledgeQuestionsGroup[]> {
  //   /**
  //    * Getting all knowledgequestion where question_id = knowledge_group_id
  //    */
  //   if (knowledge_group_id === 700) {
  //     return of([
  //       {
  //         id: 1,
  //         knowledge_group_id: 700,
  //         question: 'According to the video, where do you go on your iPhone to make VoiceOver your accessibility shortcut?',
  //         timeStamp: '00:02:15',
  //         answers: [
  //           {
  //             id: 1,
  //             answer: 'Go to Settings, and then to Control Center.',
  //             isCorrect: false,
  //             answerExplanation: 'The control center allows you to customize apps that appear in the control center display, but you cannot set up your accessibility shortcut through the control center.'
  //           },
  //           {
  //             id: 2,
  //             answer: 'Go to Settings, General, Accessibility, and then Display Accommodations',
  //             isCorrect: false,
  //             answerExplanation: 'Display Accommodations allows you to adjust the color and brightness on the screen, but not to set up your accessibility shortcut.'
  //           },
  //           {
  //             id: 3,
  //             answer: 'Go to Settings and then Display & Brightness',
  //             isCorrect: false,
  //             answerExplanation: 'Display and brightness leads you to the controls that brighten or darken your screen.'
  //           },
  //           {
  //             id: 4,
  //             answer: 'Go to Settings, General, Accessibility, and then Accessibility Shortcut',
  //             isCorrect: true,
  //             answerExplanation: 'To set up your accessibility shortcut, go to settings / general / accessibility / accessibility shortcut.'
  //           }
  //         ]
  //       },
  //       {
  //         id: 2,
  //         knowledge_group_id: 700,
  //         question: 'What gesture do you use to open the Settings app?',
  //         timeStamp: '00:02:42',
  //         answers: [
  //           {
  //             id: 1,
  //             answer: 'right flick',
  //             isCorrect: false,
  //             answerExplanation: 'Think about how to open the Settings app.'
  //           },
  //           {
  //             id: 2,
  //             answer: 'single finger double tap',
  //             isCorrect: true,
  //             answerExplanation: 'The single finger double tap gesture opens the Settings app.'
  //           },
  //           {
  //             id: 3,
  //             answer: 'triple click',
  //             isCorrect: false,
  //             answerExplanation: 'The triple click has a unique function. It might open the Settings app, but it is not the efficient gesture to do so.'
  //           },
  //           {
  //             id: 4,
  //             answer: 'double finger double tap',
  //             isCorrect: false,
  //             answerExplanation: 'You do not double finger double tap to open the Settings app.'
  //           }
  //         ]
  //       },
  //       // {
  //       //   id: 3,
  //       //   knowledge_group_id: 700,
  //       //   question: 'According to the video, what is the BEST gesture to use to move quickly within a long list?',
  //       //   timeStamp: '00:05:19',
  //       //   answers: [
  //       //     {
  //       //       id: 1,
  //       //       answer: 'three-finger flick up',
  //       //       isCorrect: true,
  //       //       answerExplanation: 'The three-finger flick up gesture allows you to move quickly within a long list.'
  //       //     },
  //       //     {
  //       //       id: 2,
  //       //       answer: 'single-finger right flick',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Think about the direction you need to move in within a long list.'
  //       //     },
  //       //     {
  //       //       id: 3,
  //       //       answer: 'single-finger left flick',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Think about the direction you need to move in within a long list.'
  //       //     },
  //       //     {
  //       //       id: 4,
  //       //       answer: 'triple click',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'You use the triple click gesture for a different function. Think about the direction you need to move in within a long list.'
  //       //     }
  //       //   ]
  //       // },
  //       // {
  //       //   id: 4,
  //       //   knowledge_group_id: 700,
  //       //   question: 'Your client is having a hard time navigating through the Accessibility list on her iPhone. In your meeting she asks, “How do I know when I have reached the end of the Accessibility list?” How should you respond?',
  //       //   timeStamp: '00:06:36',
  //       //   answers: [
  //       //     {
  //       //       id: 1,
  //       //       answer: '“The list doesn’t end; you automatically go to the top and start over.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'The list does end, and you do not automatically go back to the top.'
  //       //     },
  //       //     {
  //       //       id: 2,
  //       //       answer: '“You have to memorize the list and recognize when you reach the end.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'It is not necessary to memorize each item on the list to know when you’ve reached the end.'
  //       //     },
  //       //     {
  //       //       id: 3,
  //       //       answer: '“Listen for the end-of-list audio cue.”',
  //       //       isCorrect: true,
  //       //       answerExplanation: 'An audio cue lets you know when you have reached the end of the Accessibility list.'
  //       //     },
  //       //     {
  //       //       id: 4,
  //       //       answer: '“Flick down till you leave the list. Then start over but don’t go quite as far.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'It is not necessary to use this method to determine when you are at the end of a list.'
  //       //     }
  //       //   ]
  //       // },
  //       // {
  //       //   id: 5,
  //       //   knowledge_group_id: 700,
  //       //   question: 'Maria has located the Accessibility Shortcuts button. What gestures should Maria use to select Accessibility Shortcuts and then make VoiceOver her accessibility shortcut?',
  //       //   timeStamp: '00:07:03',
  //       //   answers: [
  //       //     {
  //       //       id: 1,
  //       //       answer: 'single-finger double tap, 3-finger flick to VoiceOver, single-finger double tap',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Think of the gestures the learning expert used to select items and scroll through lists.'
  //       //     },
  //       //     {
  //       //       id: 2,
  //       //       answer: 'single finger triple tap, right flick to VoiceOver, single finger triple tap',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Think of the gestures the learning expert used to select items and scroll through lists.'
  //       //     },
  //       //     {
  //       //       id: 3,
  //       //       answer: 'double finger double tap, right flick to VoiceOver, double finger double tap',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Think of the gestures the learning expert used to select items and scroll through lists.'
  //       //     },
  //       //     {
  //       //       id: 4,
  //       //       answer: 'single finger double tap, right flick to VoiceOver, single finger double tap',
  //       //       isCorrect: true,
  //       //       answerExplanation: 'Maria must single finger double tap on Accessibility Shortcuts, right flick to VoiceOver, and then single finger double tap VoiceOver to make it her accessibility shortcut.'
  //       //     }
  //       //   ]
  //       // },
  //       // {
  //       //   id: 6,
  //       //   knowledge_group_id: 700,
  //       //   question: 'Aaron has set up his accessibility shortcut, but has forgotten how to toggle his accessibility features on and off. When Aaron asks you, what do you say?',
  //       //   timeStamp: '00:09:06',
  //       //   answers: [
  //       //     {
  //       //       id: 1,
  //       //       answer: '“Tap the Home button two times.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Tapping the Home button twice does not turn the accessibility features on and off.'
  //       //     },
  //       //     {
  //       //       id: 2,
  //       //       answer: '“Tap the Home button once.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Tapping the Home button once does not turn the accessibility features on and off.'
  //       //     },
  //       //     {
  //       //       id: 3,
  //       //       answer: '“Tap the Home button three times.”',
  //       //       isCorrect: true,
  //       //       answerExplanation: 'Tapping the Home button three times toggles the accessibility features on and off.'
  //       //     },
  //       //     {
  //       //       id: 4,
  //       //       answer: '“Go into the Settings app.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'Using the Settings app is not the quick and easy way to turn the accessibility features on and off.'
  //       //     }
  //       //   ]
  //       // },
  //       // {
  //       //   id: 7,
  //       //   knowledge_group_id: 700,
  //       //   question: 'Maria just finished this video on setting accessibility shortcuts. She says to you, “But I don’t use VoiceOver a whole lot right now. I use the magnifier quite a bit. Do I need to find another tutorial to make my Zoom function my accessibility shortcut?” How should you respond?',
  //       //   timeStamp: '00:08:37',
  //       //   answers: [
  //       //     {
  //       //       id: 1,
  //       //       answer: '“No, use the same steps in this tutorial but select Zoom instead of VoiceOver.”',
  //       //       isCorrect: true,
  //       //       answerExplanation: 'You can use the steps in this tutorial to select Zoom as your accessibility shortcut.'
  //       //     },
  //       //     {
  //       //       id: 2,
  //       //       answer: '“No, Zoom should already be the accessibility shortcut.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'You do need to take steps to make Zoom your accessibility shortcut.'
  //       //     },
  //       //     {
  //       //       id: 3,
  //       //       answer: '“Yes, because the method in this tutorial is unique to VoiceOver.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'The method for making Zoom your accessibility shortcut is similar to VoiceOver.'
  //       //     },
  //       //     {
  //       //       id: 4,
  //       //       answer: '“Yes, because there are a few more steps to make Zoom your shortcut.”',
  //       //       isCorrect: false,
  //       //       answerExplanation: 'There aren’t any extra steps to make Zoom your shortcut.'
  //       //     }
  //       //   ]
  //       // }
  //     ]);
  //   }
  // }

  /**
   * Gets rating group by rating_group_id (rating_group_id is defined in APIMap)
   */
  // getRatingMap(rating_group_id): Observable<RatingGroup> {
  //   /**
  //    * Getting RatingInformation from DataBase
  //    */
  //   if (rating_group_id === 800) {
  //     return  of({
  //       id: 800,
  //       question: 'How can we improve this workshop?',
  //       answerLimit: 600
  //     });
  //   }
  // }

  /**
   * Gets discussion group by discussion_group_id (discussion_group_id is defined in APIMap)
   */
  // getDiscussionMap(discussion_group_id: number): Observable<DiscussionGroup[]> {

  //   /**
  //    * Getting all discutions where discussion_group_id == 600
  //    */
  //   let obs_disc = [];

  //   if (discussion_group_id === 600) {
  //     obs_disc = [
  //       {
  //         id: 1,
  //         discussion_group_id: 600,
  //         title: `I Can't find my setting icon. Where is it?`,
  //         url: '#post-title',
  //         date: 'Sat Feb 03 2018 00:00:00 GMT-0600 (Central Standard Time)',
  //         user: {
  //           id: 9923,
  //           name: 'Samantha Malone',
  //           url: '#tablist-user-one',
  //           profile_icon: {
  //             url: 'assets/images/icon-1.png',
  //             alt: ''
  //           }
  //         },
  //         comments: [
  //           {
  //             id: 2203,
  //             text: 'Some comment'
  //           },
  //           {
  //             id: 2204,
  //             text: 'Some comment'
  //           },
  //           {
  //             id: 2205,
  //             text: 'Some comment'
  //           }
  //         ]
  //       },
  //       {
  //         id: 2,
  //         discussion_group_id: 600,
  //         title: `Using accessibility with the safari browser`,
  //         url: '#post-title',
  //         date: 'Sat Feb 03 2018 00:00:00 GMT-0600 (Central Standard Time)',
  //         user: {
  //           id: 9924,
  //           name: 'Sarah Rathke',
  //           url: '#tablist-user-two',
  //           profile_icon: {
  //             url: 'assets/images/icon-2.png',
  //             alt: ''
  //           }
  //         },
  //         comments: [
  //           {
  //             id: 2206,
  //             text: 'Some comment'
  //           },
  //           {
  //             id: 2207,
  //             text: 'Some comment'
  //           },
  //           {
  //             id: 2208,
  //             text: 'Some comment'
  //           }
  //         ]
  //       },
  //       {
  //         id: 3,
  //         discussion_group_id: 600,
  //         title: `The new iOS has AWESOME improvements`,
  //         url: '#post-title',
  //         date: 'Sat Feb 03 2018 00:00:00 GMT-0600 (Central Standard Time)',
  //         user: {
  //           id: 9925,
  //           name: 'Harlen Winnenger',
  //           url: '#tablist-user-three',
  //           profile_icon: {
  //             url: 'assets/images/icon-3.png',
  //             alt: ''
  //           }
  //         },
  //         comments: [
  //           {
  //             id: 2209,
  //             text: 'Some comment'
  //           },
  //           {
  //             id: 2210,
  //             text: 'Some comment'
  //           }
  //         ]
  //       }
  //     ];
  //   }

  //   return of(obs_disc);
  // }

  /**
   * Gets file maps by videoFiles_group_id (videoFiles_group_id is defined in APIMap)
   */
  // getVideoFilesMap(videoFiles_group_id: number): Observable<VideoFilesGroup> {
  //   /**
  //    * Getting VideoFilesMap from DataBase
  //    */
  //   let obs_videoFiles;

  //   if (videoFiles_group_id === 500) {
  //     obs_videoFiles = {
  //       id: 500,
  //       video: 'https://p9i3r6r2.ssl.hwcdn.net/k4w2w6y8/cds/iFocus_Hadley/Setting_Accessibility_Shortcuts.mp4',
  //       audio: 'assets/upload/Setting_Accessibility_Shortcuts.mp3',
  //       transcript: 'assets/upload/Setting_Accessibility_Shortcuts.rtf',
  //       captions: 'assets/upload/Setting_Accessibility_Shortcuts.vtt',
  //       poster: 'assets/upload/Setting_Accessibility_Shortcuts.jpg'
  //     };
  //   }

  //   return of(obs_videoFiles);
  // }

  /**
   * Gets resources by resources_group_id ( resources_group_id is defined in APIMap)
   */
  // getResourcesMap(resources_group_id: number): Observable<ResourcesGroup[]> {
  //   /**
  //    * Getting resources from database
  //    */
  //   let obs_resources;

  //   if (resources_group_id === 900) {
  //     obs_resources = [
  //       {
  //         id: 9927,
  //         resources_group_id: 900,
  //         name: 'Audio',
  //         icon: 'fas fa-microphone',
  //         title: 'Audio Tooltip',
  //         link: {
  //           url: '#resources-audio',
  //           text: 'Download the audio board'
  //         }
  //       },
  //       {
  //         id: 9928,
  //         resources_group_id: 900,
  //         name: 'Link',
  //         icon: 'fas fa-link',
  //         title: 'Accessibility App',
  //         link: {
  //           url: '#resources-accessible-app-voice',
  //           text: 'Download the accessible App Voice'
  //         }
  //       },
  //       {
  //         id: 9929,
  //         resources_group_id: 900,
  //         name: 'Video',
  //         icon: 'fas fa-play',
  //         title: 'Guide Tooltip',
  //         link: {
  //           url: '#resources-video',
  //           text: 'Download the audio lecture'
  //         }
  //       },
  //       {
  //         id: 9930,
  //         resources_group_id: 900,
  //         name: 'Link',
  //         icon: 'fas fa-link',
  //         title: 'Guides App',
  //         link: {
  //           url: '#resources-accessible-app-voice',
  //           text: 'Download the accessible App Voice'
  //         }
  //       },
  //       {
  //         id: 9931,
  //         resources_group_id: 900,
  //         name: 'Link',
  //         icon: 'fas fa-link',
  //         title: 'Accessibility App',
  //         link: {
  //           url: '#resources-accessible-app-voice',
  //           text: 'Download the accessible App Voice'
  //         }
  //       }
  //     ];
  //   }

  //   return of(obs_resources);
  // }

  /**
   * Private function to handle errors in http
   */
  private handleResponse(response: Response) {
    try {
      if (!response) {
        throw Error('Response is not received. Please try again.')
      }

      if (!response.status || response.status < 200 || response.status >= 300){
        throw Error(response.message || "Something went wrong.");
      }

    } catch(e) {
      console.error(e);
      swal('Oops', e.message, 'error');
    }
  }
}
