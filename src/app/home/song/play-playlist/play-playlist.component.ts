import { Component, OnInit } from '@angular/core';
import {Song} from '../../../model/Song';
import {PlaylistService} from '../../../service/playlist.service';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../../../model/Playlist';
declare var $: any;

@Component({
  selector: 'app-play-playlist',
  templateUrl: './play-playlist.component.html',
  styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {

  id: number;
  songlist: Song[];
  playlist: Playlist;
  p: number;

  constructor(private playlistService: PlaylistService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(this.id).subscribe(res => {
      this.songlist = res.songs;
      this.playlist = res;
      // tslint:disable-next-line:only-arrow-functions
      $(() => {
        const audio = new Audio();
        const playerTrack = $('#player-track');
        const bgArtwork = $('#bg-artwork');
        // tslint:disable-next-line:prefer-const
        let bgArtworkUrl;
        const albumName = $('#album-name');
        const trackName = $('#track-name');
        // tslint:disable-next-line:one-variable-per-declaration prefer-const
        let albumArt = $('#album-art'),
          // tslint:disable-next-line:prefer-const
          sArea = $('#s-area'),
          // tslint:disable-next-line:prefer-const
          seekBar = $('#seek-bar'),
          // tslint:disable-next-line:prefer-const
          trackTime = $('#track-time'),
          // tslint:disable-next-line:prefer-const
          insTime = $('#ins-time'),
          // tslint:disable-next-line:prefer-const
          sHover = $('#s-hover'),
          // tslint:disable-next-line:prefer-const
          playPauseButton = $('#play-pause-button'),
          // tslint:disable-next-line:prefer-const
          i = playPauseButton.find('i'),
          // tslint:disable-next-line:prefer-const
          tProgress = $('#current-time'),
          // tslint:disable-next-line:prefer-const
          tTime = $('#track-length'),
          seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime,
          nTime = 0,
          buffInterval = null, tFlag = false;

        // tslint:disable-next-line:one-variable-per-declaration prefer-const
        let playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

        let songs: Song[] = new Array(this.songlist.length);
        // tslint:disable-next-line:no-shadowed-variable prefer-for-of
        for (let i = 0; i < this.songlist.length; i++){
          songs[i] = this.songlist[i];
        }

        // tslint:disable-next-line:typedef
        function shuffle(a) {
          // tslint:disable-next-line:one-variable-per-declaration no-shadowed-variable
          let j, x, i;
          for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
          }
          return a;
        }

        songs = shuffle(songs);

        // tslint:disable-next-line:typedef
        function playPause() {
          setTimeout(() => {
            if (audio.paused) {
              playerTrack.addClass('active');
              albumArt.addClass('active');
              checkBuffering();
              i.attr('class', 'fas fa-pause');
              audio.play();
            } else {
              playerTrack.removeClass('active');
              albumArt.removeClass('active');
              clearInterval(buffInterval);
              albumArt.removeClass('buffering');
              i.attr('class', 'fas fa-play');
              audio.pause();
            }
          }, 300);
        }


        // tslint:disable-next-line:typedef
        function showHover(event) {
          seekBarPos = sArea.offset();
          seekT = event.clientX - seekBarPos.left;
          seekLoc = audio.duration * (seekT / sArea.outerWidth());

          sHover.width(seekT);

          cM = seekLoc / 60;

          ctMinutes = Math.floor(cM);
          ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

          if ((ctMinutes < 0) || (ctSeconds < 0)) {
            return;
          }

          if ((ctMinutes < 0) || (ctSeconds < 0)) {
            return;
          }

          if (ctMinutes < 10) {
            ctMinutes = '0' + ctMinutes;
          }
          if (ctSeconds < 10) {
            ctSeconds = '0' + ctSeconds;
          }

          if (isNaN(ctMinutes) || isNaN(ctSeconds)) {
            insTime.text('--:--');
          } else {
            insTime.text(ctMinutes + ':' + ctSeconds);
          }

          insTime.css({left: seekT, 'margin-left': '-21px'}).fadeIn(0);

        }

        // tslint:disable-next-line:typedef
        function hideHover() {
          sHover.width(0);
          insTime.text('00:00').css({left: '0px', 'margin-left': '0px'}).fadeOut(0);
        }

        // tslint:disable-next-line:typedef
        function playFromClickedPos() {
          audio.currentTime = seekLoc;
          seekBar.width(seekT);
          hideHover();
        }

        // tslint:disable-next-line:typedef
        function updateCurrTime() {
          // tslint:disable-next-line:no-shadowed-variable
          const nTime = new Date().getTime();

          if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
          }

          curMinutes = Math.floor(audio.currentTime / 60);
          curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

          durMinutes = Math.floor(audio.duration / 60);
          durSeconds = Math.floor(audio.duration - durMinutes * 60);

          playProgress = (audio.currentTime / audio.duration) * 100;

          if (curMinutes < 10) {
            curMinutes = '0' + curMinutes;
          }
          if (curSeconds < 10) {
            curSeconds = '0' + curSeconds;
          }

          if (durMinutes < 10) {
            durMinutes = '0' + durMinutes;
          }
          if (durSeconds < 10) {
            durSeconds = '0' + durSeconds;
          }

          if (isNaN(curMinutes) || isNaN(curSeconds)) {
            tProgress.text('00:00');
          } else {
            tProgress.text(curMinutes + ':' + curSeconds);
          }

          if (isNaN(durMinutes) || isNaN(durSeconds)) {
            tTime.text('00:00');
          } else {
            tTime.text(durMinutes + ':' + durSeconds);
          }

          if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds)) {
            trackTime.removeClass('active');
          } else {
            trackTime.addClass('active');
          }


          seekBar.width(playProgress + '%');

          if (playProgress === 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
          }
        }

        // tslint:disable-next-line:typedef
        function checkBuffering() {
          clearInterval(buffInterval);
          buffInterval = setInterval(() => {
            if ((nTime === 0) || (bTime - nTime) > 1000) {
              albumArt.addClass('buffering');
            } else {
              albumArt.removeClass('buffering');
            }

            bTime = new Date();
            bTime = bTime.getTime();

          }, 100);
        }

        // tslint:disable-next-line:typedef
        function selectTrack(flag) {
          if (flag === 0 || flag === 1) {
            ++currIndex;
          } else {
            --currIndex;
          }

          if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag === 0) {
              i.attr('class', 'fa fa-play');
            } else {
              albumArt.removeClass('buffering');
              i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            const currAlbum = songs[currIndex].name;
            const currTrackName = songs[currIndex].singers[0].name;

            audio.src = songs[currIndex].fileUrl;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag !== 0) {
              audio.play();
              playerTrack.addClass('active');
              albumArt.addClass('active');

              clearInterval(buffInterval);
              checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
          } else {
            if (flag === 0 || flag === 1) {
              --currIndex;
            } else {
              ++currIndex;
            }
          }
        }

        // tslint:disable-next-line:typedef
        function initPlayer() {

          selectTrack(0);

          audio.loop = false;

          playPauseButton.on('click', playPause);

          sArea.mousemove((event) => {
            showHover(event);
          });

          sArea.mouseout(hideHover);

          sArea.on('click', playFromClickedPos);

          $(audio).on('timeupdate', updateCurrTime);

          playPreviousTrackButton.on('click', () => {
            selectTrack(-1);
          });
          playNextTrackButton.on('click', () => {
            selectTrack(1);
          });
        }

        initPlayer();
      });
    });
  }
}
