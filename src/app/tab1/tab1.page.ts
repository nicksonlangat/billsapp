import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  form: FormGroup;
  autocomplete: boolean = false;
  last_transaction: any;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      device_id: [localStorage.getItem('device_id')],
      phone_number: [''],
      meter_number: [''],
      amount: [''],
    });
  }
  ngOnInit() {}
  submitForm() {
    this.http
      .post('http://13.58.160.156/transaction/', this.form.value)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
      this.form.reset();
  }
  getTransactions(){
    return this.http.get(`http://13.58.160.156/transaction/${localStorage.getItem('device_id')}/user`).subscribe(res=>{
      this.last_transaction = res['data']['0'][0];
      console.log(this.last_transaction)
    })
  }
  loadLast(){
    this.autocomplete = true;
    return this.http.get(`http://13.58.160.156/transaction/${localStorage.getItem('device_id')}/user`).subscribe(res=>{
      this.form.get('phone_number').setValue(res['data']['0'][0].phone_number);
      this.form.get('meter_number').setValue(res['data']['0'][0].meter_number);
    })
  }

}
