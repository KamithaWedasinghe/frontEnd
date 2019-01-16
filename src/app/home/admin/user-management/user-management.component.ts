import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainHttpService } from 'src/app/services/common/main-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private dataService: MainHttpService) { }

  ngOnInit() {
    this.getUsers()
  }
  users: any;
  getUsers() {
    const url = `${environment.serverUrl}/user/api/users`
    this.dataService.get_auth(url).subscribe(
      (data) => {
        console.log(data)
        this.users = data['users']
      }
    );
  }
  approve(user) {
    const url = `${environment.serverUrl}/user/api/approve-register-request`
    this.dataService.put_auth(url, { email: user.email }).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.getUsers();

      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }
  reject(user) {
    const url = `${environment.serverUrl}/contract-boq/api/api/${user._id}`
    this.dataService.delete_auth(url).subscribe((data) => {
      console.log(data)
      if (!data['error'] && typeof data['error'] !== undefined) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      } else {
        this.toastr.error('Hello world!', 'Toastr fun!');
      }

    });
  }

}
