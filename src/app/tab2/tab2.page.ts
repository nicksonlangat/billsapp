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
  getTransactions(event) {
    return this.http
      .get<any>(`http://13.58.160.156/transaction/${localStorage.getItem('device_id')}/user`)
      .subscribe(response => {
        this.transactions = response['data']['0'];
        console.log(this.transactions);

        if (event)
          event.target.complete();
      }, error => {
        console.log(error);

        if (event)
          event.target.complete();
      })
  }
  ngOnInit(){
    this.getTransactions(null);
  }
}
