import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formData = { email: '', password: '' };


  constructor(private dataService: DataService) {}




  onSubmit() {

      this.dataService.postData(this.formData).subscribe(
        response => {
           confirm('註冊成功!!!');
           console.log('Data posted successfully', response);
        },
        error => {
          confirm('已經註冊!!!')
          console.error('Error posting data', error);
        }
      );

  }
  resetForm(form: NgForm): void {
    form.reset(); // Resets the form fields and state
  }

}


