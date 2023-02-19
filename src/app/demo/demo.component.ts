import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  userlist!: User[];
  forms!: FormGroup;

  constructor(private service:PostService){}

  ngOnInit() {
    this.service.getTask().subscribe((postLisst: User[]) => {
      this.userlist = postLisst
    });

    this.forms = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      genders: new FormControl(),
      ssc: new FormControl(),
      hsc: new FormControl(),
      msc: new FormControl(),
      country: new FormControl(),
    });
  }

  submit(){
    if (this.forms.value.id === null) {
      this.service.addTask(this.forms.value).subscribe((res) => {
        this.ngOnInit();
      });
    } else {
      this.service.updateReminder(this.forms.value).subscribe((res) => {
        this.ngOnInit();
      });
    }

  }


  edits(tasks: User) {
    this.forms = new FormGroup({
      id: new FormControl(tasks.id),
      name: new FormControl(tasks.name),
      genders: new FormControl(tasks.genders),
      ssc: new FormControl(tasks.ssc),
      hsc: new FormControl(tasks.hsc),
      msc: new FormControl(tasks.msc),
      country: new FormControl(tasks.country),
    });
  }

  deletes(task: User) {
    this.service.delete(task).subscribe((res) => {
      this.ngOnInit();
    });
  }

}
