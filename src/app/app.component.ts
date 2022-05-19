import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  device_id:any;
  constructor() {}
  generateUniqSerial(): string {  
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
  });  
}
  ngOnInit(){
    this.device_id = localStorage.getItem('device_id');
    if (this.device_id == null){
      localStorage.setItem('device_id', this.generateUniqSerial())
    }
    console.log('init',this.device_id)
  }
}
