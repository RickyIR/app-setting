import { WorkshopComponent } from './../../workshop.component';
import { WorkshopVideoFiles } from './../../../../../../interface/main';
import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

declare var $: any;
declare var AblePlayer: any;
declare var startAblePlayer: any;

@Component({
  selector: 'hd-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  public files: WorkshopVideoFiles;

  constructor(private WorkshopComponent: WorkshopComponent) {
  }

  ngOnInit() {
    if (this.WorkshopComponent.workshop && this.WorkshopComponent.workshop.files) {
      this.files = this.WorkshopComponent.workshop.files;

      // Sets able-player
      this.setAblePlayer();
    }
  }

  private setAblePlayer(): void {
    const video = $('video').each((index, element) => {
      if ($(element).data('able-player') !== undefined ) {

        /**
         * startAblePlayer - the function that creates ableplayer
         * @argument - Object
         * @property element: HTMLElement - Video element (ableplayer)
         * @property onRefreshControls: Function - a callback that will be called at the end of the AblePlayer.refreshControls function
         * @property onResizeWindow: Function - a callback that will be called at the end of the AblePlayer.onWindowResize function
         * @property onOpenCaption: Function - a callback that will be called right before the caption is opened
         * @property onCloseCaption: Function - a callback that will be called right before the caption is closed
         * @property onOpenTranscript: Function - a callback that will be called right before the transcript is opened
         * @property onCloseTranscript: Function - a callback that will be called right before the transcript is closed
         * @property onPlayButtonClick: Function - a callback that will be called when the play button is clicked
         *
         * All functions has AblePlayer object as the first argument
         */

        startAblePlayer({
          element: element,
          /**
           * Function that will be called in AblePlayer.refreshControls function
           */
          onRefreshControls: (AblePlayer) => {
            if (AblePlayer.$statusBarDiv.css('display') === 'none') {
              AblePlayer.$statusBarDiv.css({display: 'block', float: 'left'});
              AblePlayer.$statusBarDiv.insertBefore(AblePlayer.$controllerDiv.find('.able-right-controls').last());
              AblePlayer.$statusBarDiv.find('.able-timer').css('float', 'none');
            }

            /**
             * If the transcript is closed, return..
             */
            if (!AblePlayer.prefTranscript) {
              return;
            }

            /**
             * If the transcript is opened and mobile width is less than 768px
             */
            if (window.outerWidth < 768) {
              AblePlayer.$ableWrapper[0].style.display = 'block';
              if (AblePlayer.$ableDiv[0].classList.contains('w-75')) {
                AblePlayer.$ableDiv[0].classList.remove('w-75');
              }
              AblePlayer.$ableDiv[0].classList.add('w-100');
              AblePlayer.$media[0].style.borderTopRightRadius = '10px';
              AblePlayer.$transcriptArea[0].style.width = '100%';
              AblePlayer.$transcriptArea[0].style.height = 300 + 'px';
              AblePlayer.$transcriptDiv[0].style.height = 300 - 55 + 'px';

              return;
            }
            /**
             * If the transcript is opened and desktop width is more than 768px
             */
            AblePlayer.$ableWrapper[0].style.display = 'flex';
            if (AblePlayer.$ableDiv[0].classList.contains('w-100')) {
              AblePlayer.$ableDiv[0].classList.remove('w-100');
            }
            AblePlayer.$ableDiv[0].classList.add('w-75');
            AblePlayer.$media[0].style.borderTopRightRadius = '0';
            AblePlayer.$transcriptArea[0].style.width = '25%';
            AblePlayer.$transcriptArea[0].style.height = AblePlayer.$vidcapContainer[0].offsetHeight + AblePlayer.$playerDiv[0].offsetHeight + 'px';
            AblePlayer.$transcriptDiv[0].style.height = AblePlayer.$vidcapContainer[0].offsetHeight + AblePlayer.$playerDiv[0].offsetHeight - 55 + 'px';
          },
          /**
           * Function that will be called right before the transcript is opened
           */
          onOpenTranscript: function(AblePlayer) {
             /**
             * Hides for fullscreen (temp.)
             */
            if (AblePlayer.isFullscreen()) {
              AblePlayer.$ableWrapper[0].style.display = 'block';
              if (AblePlayer.$ableDiv[0].classList.contains('w-75')) {
                AblePlayer.$ableDiv[0].classList.remove('w-75');
              }
              AblePlayer.$ableDiv[0].classList.add('w-100');
              AblePlayer.$media[0].style.borderTopRightRadius = '0';
              AblePlayer.$transcriptArea[0].style.width = '100%';
              AblePlayer.$transcriptArea[0].style.display = 'none';
              return;
            } else {
              AblePlayer.$transcriptArea[0].style.display = 'block';
            }

            if (window.outerWidth < 768) {
              AblePlayer.$ableWrapper[0].style.display = 'block';
              if (AblePlayer.$ableDiv[0].classList.contains('w-75')) {
                AblePlayer.$ableDiv[0].classList.remove('w-75');
              }
              AblePlayer.$ableDiv[0].classList.add('w-100');
              AblePlayer.$media[0].style.borderTopRightRadius = '10px';
              AblePlayer.$transcriptArea[0].style.width = '100%';

              return;
            }

            AblePlayer.$ableWrapper[0].style.display = 'flex';
            if (AblePlayer.$ableDiv[0].classList.contains('w-100')) {
              AblePlayer.$ableDiv[0].classList.remove('w-100');
            }
            AblePlayer.$ableDiv[0].classList.add('w-75');
            AblePlayer.$media[0].style.borderTopRightRadius = '0';
            AblePlayer.$transcriptArea[0].style.width = '25%';

            /**
             * Calls function to refresh the transcript and seekbar
             */
            AblePlayer.refreshControls();

          },
          /**
           * Function that will be called right before the transcript is closed
           */
          onCloseTranscript: function(AblePlayer) {
            AblePlayer.$ableWrapper[0].style.display = 'block';
            if (AblePlayer.$ableDiv[0].classList.contains('w-75')) {
              AblePlayer.$ableDiv[0].classList.remove('w-75');
            }
            AblePlayer.$ableDiv[0].classList.add('w-100');
            AblePlayer.$media[0].style.borderTopRightRadius = '10px';
            AblePlayer.$transcriptArea[0].style.width = '100%';

            /**
             * Calls function to refresh the transcript and seekbar
             */
            AblePlayer.refreshControls();
          },
          onPlayButtonClick: (AblePlayer) => {
            /**
             * Creates an animation for the big play button.
             * zoomIn on entering
             * bounceOut on leaving
             */
            const playButton = AblePlayer.$bigPlayButton[0];

            if (!playButton || !playButton.classList) {
              return;
            }

            $('.able-quiz-options').remove();

            playButton.classList.remove('d-none');
            playButton.classList.remove('bounceOut');
            playButton.classList.remove('zoomIn');

            if (!playButton.classList.contains('animated--fast')) {
              playButton.classList.add('animated--fast');
            }

            if (AblePlayer.isPaused()) {
              playButton.classList.add('zoomIn');
            } else {
              playButton.classList.add('d-block');
              playButton.classList.add('bounceOut');

              setTimeout(() => {
                playButton.classList.remove('d-block');
              }, 500);
            }
          },
          onMediaCompleted: (AblePlayer) => {
            const playButton = AblePlayer.$bigPlayButton[0];
            playButton.classList.remove('bounceOut');
            playButton.classList.remove('zoomIn');

            playButton.classList.add('d-block');
            playButton.classList.add('zoomIn');
          }
        });
      }
    });
  }


  public watchSegment(timeStampStart, timeStampEnd): void {
    try{
      if (!AblePlayer || !AblePlayer.lastCreated) {
        throw Error('AblePlayer is not defined');
      }
      const player = AblePlayer.lastCreated;

      if (!timeStampStart) {
        throw Error('Current question is not found');
      }

      if (!player.seekBar || !player.seekBar.duration) {
        throw Error('Seekbar is not found');
      }

      const count = (str, ch) => _.sumBy(str, x => x === ch);

      if (count(timeStampStart, ':') === 1) {
        timeStampStart = '00:' + timeStampStart;
      }

      if (count(timeStampEnd, ':') === 1) {
        timeStampEnd = '00:' + timeStampEnd;
      }

      const videoDuration = player.seekBar.duration.toFixed();
      const timeStamp = moment.duration(timeStampStart);
      const seekTime = player.seekBar.duration;
      const newSeekTime = seekTime * timeStamp.as('s') / videoDuration;

      if (player.useChapterTimes) {
        player.seekTo(player.convertChapterTimeToVideoTime(newSeekTime));
      } else {
        player.seekTo(newSeekTime);
      }

      let seekBar = player.seekBar;

      const timeUpdateEventHandler = () => {
        let current = seekBar.position;

        if(current > moment.duration(timeStampEnd).as('s')){
          player.pauseMedia();

          /**
           * Shows buttons to go back to quiz
           */
          player.$bigPlayButton.addClass('d-none');

          const div = $('<div></div>');
            div.addClass('able-quiz-options');

          const replay = $('<button></button>');
            replay.append($('<span></span>').text('Replay'));
            replay.addClass('icon-restart able-big-play-button able-quiz-options-left');
            replay.click((e) => {

              player.$mediaContainer.find('.able-quiz-options').remove();
              this.watchSegment(timeStampStart, timeStampEnd);
            });

          const backToQuiz = $('<button></button>');
            backToQuiz.append($('<span></span>').text('Back to quiz'));
            backToQuiz.addClass('icon-transcript able-big-play-button able-quiz-options-right');
            backToQuiz.click((e) => {

              player.$mediaContainer.find('.able-quiz-options').remove();

              $('html, body').animate({
                scrollTop: $('.knowledge').offset().top - 100
              }, 500);
            });

          div.append(replay);
          div.append(backToQuiz);

          player.$mediaContainer.append(div);

          player.$media.off('timeupdate', timeUpdateEventHandler);
        }
      }

      player.$media.on('timeupdate', timeUpdateEventHandler);


      if (player.isPaused()) {
        player.playMedia();
      }

      $(player.$media[0]).focus();

    }catch(e){

    }
  }

}
