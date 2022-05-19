import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  device_id:any;
  my_numbers:any = [];
  form: FormGroup;
  details: any = [];
  constructor(private http: HttpClient, public fb: FormBuilder,) {
    this.form = this.fb.group({
      device_id: [localStorage.getItem('device_id')],
      number_string: [''],
    });
    
  }
  submitForm() {
    this.http
      .post('http://13.58.160.156/transaction/details/', this.form.value)
      .subscribe({
        next: (response) => this.getDetails(),
        error: (error) => console.log(error),
      });
      this.form.reset();
  }

  getDetails(){
    return this.http.get(`http://13.58.160.156/transaction/${localStorage.getItem('device_id')}/user/details`).subscribe(res=>{
      this.details = res['data']['0'];
      console.log(this.details)
    })
  }

  deleteDetail(id){
    return this.http.delete(`http://13.58.160.156/transaction/details/${id}`).subscribe(res=>{
      this.getDetails();
    })
  }

  ngOnInit(){
    localStorage.setItem('my_numbers', this.my_numbers);
    this.device_id = localStorage.getItem('device_id');
    this.getDetails();
  }

}
