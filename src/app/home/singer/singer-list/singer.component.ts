import { Component, OnInit } from '@angular/core';
import {Singers} from '../../../model/Singers';
import {SingerService} from '../../../service/singer.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {

  singerList: Singers[] = [];

  constructor(private singerService: SingerService) { }

  ngOnInit(): void {
    this.singerService.getAllSinger().subscribe(data => {
      this.singerList = data;
    });
  }
}
