import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  transactions: any = [];
  constructor(private http: HttpClient) {}

  getTransactions(){
    return this.http.get(`http://13.58.160.156/transaction/${localStorage.getItem('device_id')}/user`).subscribe(res=>{
      this.transactions = res['data']['0'];
      console.log(this.transactions)
    })
  }

  ngOnInit(){
    this.getTransactions();
  }
}
