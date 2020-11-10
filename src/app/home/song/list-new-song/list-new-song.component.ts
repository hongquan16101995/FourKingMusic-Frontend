import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';

declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-list-new-song',
  templateUrl: './list-new-song.component.html',
  styleUrls: ['./list-new-song.component.scss']
})
export class ListNewSongComponent implements OnInit {

  songList: Song[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongsNew().subscribe(data => {
      this.songList = data;
      $(() => {
        const swiper = new Swiper('.carousel-gallery .swiper-container', {
          effect: 'slide',
          speed: 900,
          slidesPerView: 5,
          spaceBetween: 20,
          simulateTouch: true,
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          pagination: {
            el: '.carousel-gallery .swiper-pagination',
            clickable: true
          },
          breakpoints: {
            // when window width is <= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 5
            },
            // when window width is <= 480px
            425: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            // when window width is <= 640px
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            // when window width is <= 640px
            1680: {
              slidesPerView: 6,
              spaceBetween: 40
            }
          }
        });

      });

      console.log(data);
    });
  }


}
