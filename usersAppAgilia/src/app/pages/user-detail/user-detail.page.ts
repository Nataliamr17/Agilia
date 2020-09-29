import { Component, OnInit } from '@angular/core';
import { UserPage } from 'src/app/shared/models/users.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { map, switchMap, take, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  user$: Observable<User> = this.activatedRoute.params.pipe(
    take(1),
    map((params) => params?.id),
    tap((id) => (this.isNew = id === 'new')),
    filter((id) => id !== 'new'),
    switchMap((id) => this.usersService.getUserDetail(id)),
    tap((user) => {
      this.user = user;
      this.form.patchValue(user);
    })
  );
  user: User;
  public state = 'loaded';
  isNew = false;


  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(5)]],
    });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    // const { id } = this.route.snapshot.params;
    // this.user = this.usersService.getUserDetail(+id);
  }
  // public submit(): void {
  //   this.user.email = this.user.email + this.form.controls.email.value;
  // }
  submitForm() {
    this.state = 'loading';

    const oldUser = { ...this.user };
    this.user = { ...this.user, ...this.form.value };

    if (this.isNew) {
      this.usersService.addUser(this.user).subscribe(
        (id) => {
          this.state = 'loaded';
          this.router.navigate([`/users/${id}`]);
        },
        (error) => {
          console.log(error);
          this.state = 'error';
          this.user = { ...oldUser };
        }
      );
    } else {
      this.usersService.updateUser(this.user).subscribe(
        () => {
          this.state = 'loaded';
        },
        (error) => {
          console.log(error);
          this.state = 'error';
          this.user = { ...oldUser };
        }
      );
    }
  }

}
