import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../service/users.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  informationForm: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.informationForm = this.fb.group({
      name: [''],
      gender: [''],
      hobbies: ['']
    });
  }

  // tslint:disable-next-line:typedef
  information(){
    const user = {
      name: this.informationForm.value.name,
      gender: this.informationForm.value.gender,
      hobbies: this.informationForm.value.hobbies
    };
    this.userService.changeInfo(user).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.message == 'Update successful') {
        this.router.navigate(['login']);
      } else {
        console.log(res);
      }
    });
  }
}
