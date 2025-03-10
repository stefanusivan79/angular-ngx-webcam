import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgIf, WebcamModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-camera';

  permissionStatus = '';
  camData: any = null;
  capturedImage: any = '';
  capturedImageBase64: any = '';
  trigger: Subject<void> = new Subject();

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  checkPermission() {
    navigator.mediaDevices.getUserMedia({
      video: {width: 500, height: 500}
    }).then((stream) => {
      this.permissionStatus = 'Allowed';
      this.camData = stream;
      console.log(stream);
    }).catch((error) => {
      this.permissionStatus = 'Not Allowed';
      console.log(this.permissionStatus);
    })
  }

  capture(event: WebcamImage) {
    console.log('event', event);
    this.capturedImage = event.imageAsDataUrl;
    this.capturedImageBase64 = event.imageAsBase64;
  }

  captureImage() {
    this.trigger.next();
  }
}
