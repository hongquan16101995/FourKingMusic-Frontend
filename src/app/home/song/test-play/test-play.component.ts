import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {Singers} from '../../../model/Singers';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';

declare var Amplitude: any;

@Component({
  selector: 'app-test-play',
  templateUrl: './test-play.component.html',
  styleUrls: ['./test-play.component.css']
})
export class TestPlayComponent implements OnInit {

  id: number;
  song: Song;
  avaUrl: string;
  name: string;
  singers: Singers[];
  fileURL: string;
  user: string;

  constructor(private songService: SongService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.songService.getSongById(this.id).subscribe(data => {
      this.song = {
        id: data.id,
        user: data.user,
        singers: data.singers,
        dateCreated: data.dateCreated
      };
      this.avaUrl = data.avatarUrl;
      this.name = data.name;
      this.singers = data.singers;
      this.fileURL = data.fileUrl;
      this.user = data.user.name;
      Amplitude.init({
        songs: [
          {
            url: data.fileUrl,
            cover_art_url: data.avatarUrl
          },
        ],
        callbacks: {
          // tslint:disable-next-line:typedef
          play() {
            document.getElementById('album-art').style.visibility = 'hidden';
            document.getElementById('large-visualization').style.visibility = 'visible';
          },

          // tslint:disable-next-line:typedef
          pause() {
            document.getElementById('album-art').style.visibility = 'visible';
            document.getElementById('large-visualization').style.visibility = 'hidden';
          }
        },
        waveforms: {
          sample_rate: 50
        }
      });
    });

    /*
    When the bandcamp link is pressed, stop all propagation so AmplitudeJS doesn't
    play the song.
    */
    const bandcampLinks = document.getElementsByClassName('bandcamp-link');

    // tslint:disable-next-line:prefer-for-of no-shadowed-variable
    for (let i = 0; i < bandcampLinks.length; i++) {
      // tslint:disable-next-line:only-arrow-functions typedef
      bandcampLinks[i].addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }


    const songElements = document.getElementsByClassName('song');

    // // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < songElements.length; i++) {
    //   /*
    //   Ensure that on mouseover, CSS styles don't get messed up for active songs.
    //   */
    //   // tslint:disable-next-line:typedef
    //   songElements[i].addEventListener('mouseover', function() {
    //     this.style.backgroundColor = '#00A0FF';
    //
    //     this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#FFFFFF';
    //     this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#FFFFFF';
    //
    //     if (!this.classList.contains('amplitude-active-song-container')) {
    //       this.querySelectorAll('.play-button-container')[0].style.display = 'block';
    //     }
    //
    //     this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'none';
    //     this.querySelectorAll('img.bandcamp-white')[0].style.display = 'block';
    //     this.querySelectorAll('.song-duration')[0].style.color = '#FFFFFF';
    //   });
    //
    //   /*
    //   Ensure that on mouseout, CSS styles don't get messed up for active songs.
    //   */
    //   // tslint:disable-next-line:typedef
    //   songElements[i].addEventListener('mouseout', function() {
    //     this.style.backgroundColor = '#FFFFFF';
    //     this.querySelectorAll('.song-meta-data .song-title')[0].style.color = '#272726';
    //     this.querySelectorAll('.song-meta-data .song-artist')[0].style.color = '#607D8B';
    //     this.querySelectorAll('.play-button-container')[0].style.display = 'none';
    //     this.querySelectorAll('img.bandcamp-grey')[0].style.display = 'block';
    //     this.querySelectorAll('img.bandcamp-white')[0].style.display = 'none';
    //     this.querySelectorAll('.song-duration')[0].style.color = '#607D8B';
    //   });
    //
    //   /*
    //   Show and hide the play button container on the song when the song is clicked.
    //   */
    //   // tslint:disable-next-line:typedef
    //   songElements[i].addEventListener('click', function() {
    //     this.querySelectorAll('.play-button-container')[0].style.display = 'none';
    //   });
    // }

    /*
    Initializes AmplitudeJS
    */
    // document.getElementById('large-visualization').style.height = document.getElementById('album-art').offsetWidth + 'px';
  }
}
