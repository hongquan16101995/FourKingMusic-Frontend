import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {Singers} from '../../../model/Singers';
declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {

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
        dateCreated: data.dateCreated,
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
  }
}
