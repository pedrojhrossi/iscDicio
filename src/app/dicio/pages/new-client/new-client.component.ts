import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  dicio = {
    credentials: {
      id: '87943e1e-5b46-47b9-ad18-96991cb544d1',
      key: 'RVm0V7Vrxd9VOMRurlTVv7cm769B9YkN',
    },
    debug: true,
    variant: 'only_text',
    mode: 'prod',
    custom_process: 'https://app.proddicio.net',
    text: 'Nuevo Cliente',
  };

  status(status: any): void {
    console.log('integrador status -> ', status);
  }
  error(error: any): void {
    console.log('integrador error -> ', error);
    this.router.navigate(['/iscCalendar/homeScreen']);
  }
  finish(data: any): void {
    console.log('integrador data -> ', data);
  }
}
